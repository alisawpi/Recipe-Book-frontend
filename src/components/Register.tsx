import React from "react"
import '../styles/Login.scss'

/* ADD ROUTER*/
const Register = (): JSX.Element => {
    return (
        <div className='container-fluid' id='login-form-container'>
            <div className="row" id='login-form-row'>
                <div className="col-sm" id='welcome-login'>
                    <h3>
                        Welcome to RecipeLib!
                    </h3>
                </div>
                <div className="col-sm" >
                    <form id='login-form-column'>
                        <div>
                            <label htmlFor='login-username' className='form-label' >Username</label>
                            <input type='text' id='login-username' className='form-control' placeholder='username' />
                        </div>
                        <div>
                            <label htmlFor='login-password' className='form-label'>Password</label>
                            <input type='password' id='login-password' placeholder='password' className='form-control' />
                        </div>
                        <button type='submit' className="btn btn-outline-warning" >Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;