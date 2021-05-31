import React, { useState } from "react"
import { createUser } from '../services/auth'
import { useDispatch } from 'react-redux'
import { createMessageAction } from "../state/messageReducer"
import '../styles/Login.scss'


/* ADD ROUTER*/
const Signup = (): JSX.Element => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const dispatch = useDispatch()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password || !username || !repeatPassword) {
            dispatch(createMessageAction({ error: true, text: 'Please fill out all of the fields' }))
        }
        if (password != repeatPassword) {
            dispatch(createMessageAction({ error: true, text: 'The passwords did not match, please try again' }))
            return
        }
        const newUser = { username: username, password: password }
        const result = await createUser(newUser)
        if (result !== true) dispatch(createMessageAction({ error: true, text: result }))
        else
            dispatch(createMessageAction({ error: false, text: 'Signed up successfully!' }))
    }

    return (
        <div className='container-fluid' id='signup-form-container'>
            <form id='signup-form-column' onSubmit={handleSignup}>
                <div>
                    <label htmlFor='signup-username' className='form-label' >Username</label>
                    <input type='text' id='signup-username' className='form-control' placeholder='username' onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='signup-password' className='form-label'>Password</label>
                    <input type='password' id='signup-password' placeholder='password' className='form-control' onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='signup-password-repeat' className='form-label'>Repeat password</label>
                    <input type='password' id='signup-password-repeat' placeholder='password' className='form-control' onChange={e => setRepeatPassword(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-outline-warning" >Signup</button>
            </form>
        </div>
    );
}
export default Signup;