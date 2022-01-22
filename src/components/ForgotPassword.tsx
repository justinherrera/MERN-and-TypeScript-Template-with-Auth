import React, { useState } from 'react'
import { forgotPassword } from "../api/useQuery"
import { Link } from "react-router-dom"

const ForgotPassword = () => {

    const [userForm, setUserForm] = useState({
        email: '',
    })

    const submitHandler = async (e: any) => {
        e.preventDefault();
        
        await forgotPassword(`${process.env.REACT_APP_SERVER}/users/forgotPassword`, 
        {
            email: userForm.email,
        }, 
        (response) => {
            alert(response.data.message)
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
                <input type='submit' value='Reset Password'/>
            </form>
        </div>
    )
}

export default ForgotPassword
