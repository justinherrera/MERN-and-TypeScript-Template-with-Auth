/* Controllers */
import * as Auth from 'controllers/Auth'
import * as User from 'controllers/User'

/* Validator */
import * as Validator from 'middlewares/validators/users'

import { Router } from "express"

const { userValidationRules, validate } = Validator

export default (router: Router) => {
    
    // app.use('/users', app)

    // Authentication
    router.post('/users/signup', userValidationRules(), validate, Auth.signup)
    router.post('/users/login', Auth.login)
    router.get('/users/logout', Auth.logout)
    router.post('/users/forgotPassword', Auth.forgotPassword)
    router.patch('/users/resetPassword/:token', Auth.resetPassword)

    /* USERS ROUTE */
    router.get('/users', Auth.isAuth, User.getAllUsers)
    router.get('/users/:id', Auth.isAuth, User.getUser)
    router.patch('/users/updateProfile/:id', Auth.isAuth, User.updateProfile)
}


