import React, { useState } from "react"
import '../styles/Login.scss'
import { loginUser } from '../services/auth'
import {useDispatch } from 'react-redux'
import { createMessageAction } from "../state/messageReducer"

/* ADD ROUTER*/
const Login = (): JSX.Element => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch() 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const loginCredentials = { username: username, password: password }
        const result = await loginUser(loginCredentials)
        console.log(result)
        if (result !== true) dispatch(createMessageAction({ error: true, text: result }))
        else  dispatch(createMessageAction({ error: false, text: "Logged in!" }))
    }

    return (
        <div className='container-fluid' id='login-form-container'>
            <form id='login-form-column' onSubmit={handleLogin}>
                <div>
                    <label htmlFor='login-username' className='form-label' >Username</label>
                    <input type='text' id='login-username' className='form-control' placeholder='username' onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='login-password' className='form-label'>Password</label>
                    <input type='password' id='login-password' placeholder='password' className='form-control' onChange={e => setPassword(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-outline-warning" >Login</button>
            </form>
        </div>
    );
}
export default Login;