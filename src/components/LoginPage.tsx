import React, { useState } from 'react'
import { login } from "../api/useQuery"
import { useNavigate, Link } from "react-router-dom"

const LoginPage = () => {

    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const submitHandler = async (e: any) => {
        e.preventDefault();
        
        await login(`${process.env.REACT_APP_SERVER}/users/login`, 
        {
            email: userForm.email,
            password: userForm.password
        }, 
        (response) => {
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token)
                navigate('/users')
            }
            return response
        }).catch((err) => {
            console.log(err.response)
            const error = err.response.data.message
            console.log(error)
            alert(error)
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
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

                <input type='submit' value='Login'/>
            </form>

            <p>Trouble Logging in? <Link to='/forgotPassword'>Forgot Password</Link></p>
            <p>Not a member? <Link to='/signup'>Signup</Link></p>
        </div>
    )
}

export default LoginPage
