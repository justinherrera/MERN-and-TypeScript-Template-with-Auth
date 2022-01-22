import axios from "axios"

interface AuthHeader {
    headers: { 
        'Authorization': string 
    }
}

interface LoginBody {
    email: string;
    password: string;
}

interface SignupBody {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

interface ForgotPasswordBody {
    email: string
}

type callbackFn = (response: any) => Promise<any>

// user request
export const getUsers = (route: string, headers: AuthHeader, fn: callbackFn) => axios.get(route, headers).then(fn)
export const getUser = (route: string, headers: AuthHeader, fn: callbackFn) => axios.get(route, headers).then(fn)


// auth request
export const signup = (route: string, body: SignupBody, fn: callbackFn) => axios.post(route, body).then(fn)
export const login = (route: string, body: LoginBody, fn: callbackFn) => axios.post(route, body).then(fn)
export const logout = (route: string, fn: callbackFn) => axios.get(route).then(fn)
export const forgotPassword = (route: string, body: ForgotPasswordBody, fn: callbackFn) => axios.post(route, body).then(fn)