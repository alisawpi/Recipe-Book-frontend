/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react"
import Login from './components/Login'
import RecipeList from './components/RecipeList'
import RecipePage from './components/RecipePage'
import Signup from './components/Signup'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import { logoutUser } from './services/auth'
import MessageAlert from './components/MessageAlert'
import CreateRecipeForm from "./components/CreateRecipeForm"

const App = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const message = useSelector((state: RootState) => state.message.message)
    
    return (
        <Router>
            {user ?
                <nav className='navbar navbar-dark bg-dark'>
                    <div className="container-fluid justify-content-end">
                        <button className='btn btn-outline-light me-2' onClick={() => logoutUser()}>Logout</button>
                        <Link to='/'>  <button className='btn btn-outline-light me-2'>Discover</button></Link>
                        <Link to='/create'>  <button className='btn btn-outline-light me-2'>Create</button></Link>
                        <Link to='/saved'>  <button className='btn btn-outline-light me-2'>Saved</button></Link>
                    </div>
                </nav>
                :
                <nav className='navbar navbar-dark bg-dark'>
                    <div className="container-fluid justify-content-end">
                        <Link to='/'>  <button className='btn btn-outline-light me-2'>Discover</button></Link>
                        <Link to='/login'>  <button className='btn btn-outline-light me-2'>Login</button></Link>
                        <Link to='/signup'>  <button className='btn btn-outline-light me-2'>Signup</button></Link>
                    </div>
                </nav>

            }
            <MessageAlert error={message?.error} text={message?.text} />
            <Switch>
                {/*<Route path='/create'>
                    <CreateRecipeForm />
                </Route>*/}
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/recipes/:id'>
                    <RecipePage />
                </Route>
                <Route path='/create'>
                    <CreateRecipeForm/>
                </Route>
                <Route path='/'>
                    <RecipeList />
                </Route>
            </Switch>
        </Router>
    )
}
export default App