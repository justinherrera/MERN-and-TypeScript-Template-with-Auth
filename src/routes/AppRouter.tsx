import React from 'react'
import Home from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import Users from '../components/Users';
import User from '../components/User';
import NotFound from '../components/ErrorPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from '../components/SignupPage';
import ForgotPassword from '../components/ForgotPassword';

const AppRouter = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />

                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/signup" element={ <SignupPage /> } />
                <Route path="/forgotPassword" element={ <ForgotPassword /> } />
                <Route path="/users" element={ <Users /> } />
                <Route path="/users/:id" element={ <User /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
