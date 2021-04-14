/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react"
import CreateRecipeForm from "./components/CreateRecipeForm"
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/create'>
                    <CreateRecipeForm />
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}
export default App