import React, { useState, useEffect } from 'react'
import { signup } from "../api/useQuery"
import { useNavigate, Link } from "react-router-dom"

const SignupPage = () => {

    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    })
    const [errorMessage, setErrorMessage] = useState<IErrorState[] | []>([])
    const navigate = useNavigate()

    const submitHandler = async (e: any) => {
        e.preventDefault();
        
        await signup(`${process.env.REACT_APP_SERVER}/users/signup`, 
        {
            name: userForm.name,
            email: userForm.email,
            password: userForm.password,
            passwordConfirm: userForm.passwordConfirm,
        }, 
        (response) => {
            console.log(response)
            if(response.status === 201) {
                localStorage.setItem('token', response.data.token)
                navigate('/users')
            }
            return response
        }).catch((err) => {
            console.log(err.response.data.errors)
            const errors = err.response.data.errors
            const errorCount = err.response.data.errors.length
            
            if(errorCount > 1) {
                errors.map((error: any) => {
                    console.log(Object.values(error).toString())
                    setErrorMessage([Object.values(error).toString()])
                })
            } else if (errorCount === 1) {
                for (var property in errors) {
                    console.log(Object.values(errors[property]).toString())
                    setErrorMessage([Object.values(errors[property]).toString()])
                }
            }
            // setErrorMessage(err.response.data.errors)
        })


    }

    useEffect(() => {
        console.log(errorMessage)
        // alert(errorMessage)
    }, [errorMessage])

    return (
        <div>
            <form onSubmit={submitHandler}>

                <label htmlFor='name'>Name: </label>
                <input 
                    type='text' 
                    placeholder='Juan Dela Cruz' 
                    onChange={e => setUserForm({ ...userForm, name: e.target.value })} 
                    value={userForm.name} 
                    autoComplete='off'
                    required 
                />

                <label htmlFor='email'>Email Address: </label>
                <input 
                    type='email' 
                    placeholder='you@example.com' 
                    onChange={e => setUserForm({ ...userForm, email: e.target.value })} 
                    value={userForm.email} 
                    autoComplete='off'
                    required 
                />

                <label htmlFor='password'>Password: </label>
                <input 
                    type='password' 
                    onChange={e => setUserForm({ ...userForm, password: e.target.value })} 
                    value={userForm.password} 
                    autoComplete='off'
                    required 
                />

                <label htmlFor='passwordConfirm'>Confirm Password: </label>
                <input 
                    type='password' 
                    onChange={e => setUserForm({ ...userForm, passwordConfirm: e.target.value })} 
                    value={userForm.passwordConfirm} 
                    autoComplete='off'
                    required 
                />

                <input type='submit' value='Signup'/>
            </form>

            <p>Already a member? <Link to='/login'>Login</Link></p>
        </div>
    )
}

export default SignupPage
