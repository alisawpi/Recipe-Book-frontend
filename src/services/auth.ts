import axios from 'axios';
import { UserCredentials } from '../types'
import store from '../state/store'
import {loginUserAction, logoutUserAction } from '../state/userReducer'
const baseURL = '/api/users'


export const createUser = async (user: UserCredentials): Promise<true | string> => {
    try {
        const response = await axios.post(`${baseURL}/signup`, user);
        const token = response.data
        window.localStorage.setItem("token", token)
        store.dispatch(loginUserAction({...user, token: token}))
        return true
    } catch (e) {
        if ( e.response.data.error.includes('expected `username` to be unique')) return "Username already taken"
        else return "Something went wrong, pleasy try again."
    }
}

export const loginUser = async (user: UserCredentials): Promise<true | string> => {
    try {
        const response = await axios.post(`${baseURL}/login`, user); 
        console.log(response)
        const token = response.data
        window.localStorage.setItem("token", token)
        store.dispatch(loginUserAction({...user, token: token}))
        return true
    } catch(e) {
        console.log(e.response)
        if (e.response.status === 401) return 'Incorrect username or password'
        else return 'Something went wrong please try again.'
    }
}

export const logoutUser = (): void => {
    window.localStorage.removeItem("token")
    store.dispatch(logoutUserAction())
}
