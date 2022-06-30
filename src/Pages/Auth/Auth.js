import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth-context";

import "./Auth.css"

const Auth = () => {

    // FIRST
    // NEED A LOGGING UP AND SIGN IN FORM --done
    // NEED STATE TO DETERMINE WHICH FORM TO RENDER --done
    // STATE CHANGE HANDLER FOR WHEN BUTTON TO SWITCH IS PRESSED  --done
    // SUBMIT HANDLER FUNCTION --done
    // CONDITIONAL RENDERING OF FORM BEFORE RETURN STATEMENT 
    
    
    // NEXT
    // VALIDATE FORM INPUTS
    // ERROR HANDLING
    // ONCHANGE & ONBLUR HANDLERS
    // STATES OR REFS FOR INPUTS

    const auth = useContext(AuthContext)

    const [ isLoggingIn, setIsLoggingIn ] = useState(true)
    
    let loginForm

    if (isLoggingIn) {
        loginForm = 
            <div>

                <div className="form-field">
                    <label>Username/Email</label>
                    <input type="text" />
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input type="password" minLength="6" />
                </div>
                
            </div>

    } else {
        loginForm = 
            <div>
                
                <div className="form-field">
                    <label>Username</label>
                    <input type="text" />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input type="text" />
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input type="password" minLength="6" />
                </div>
                
            </div>
    }
    
    const changeLoginHandler = () => {
        if (isLoggingIn) {
            setIsLoggingIn(false)
        } else {
            setIsLoggingIn(true)
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        auth.login()
    }

    return (
        <div>

            <p className="auth-p">
                { isLoggingIn ? "Login" : "Signup"}
            </p>

            <form onSubmit={ formSubmitHandler } className = "auth-form">
                
                { loginForm }

                <div>
                    <button type='submit' className="auth-form-button">
                        { isLoggingIn ? "Login" : "Signup" }
                    </button>

                    <p onClick={ changeLoginHandler } className="switch-state-p">{ isLoggingIn ? "I need an Account" : "I already have an account"}</p>
                </div>
            </form>
        </div>
    )
}

export default Auth