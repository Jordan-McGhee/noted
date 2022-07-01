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

    const authContext = useContext(AuthContext)

    const [ isLoggingIn, setIsLoggingIn ] = useState(true)
    
    let loginForm

    if (isLoggingIn) {
        loginForm = 
            <div>

                <div className="form-field">
                    <label htmlFor="email" >Email</label>
                    <input type="text" name="email"/>
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input type="password" minLength="6" name="password" />
                </div>
                
            </div>

    } else {
        loginForm = 
            <div>
                
                <div className="form-field">
                    <label>Username</label>
                    <input type="text" name="username" />
                </div>

                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input type="password" minLength="6" name="password" />
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

    const formSubmitHandler = async (event) => {
        event.preventDefault()

        if (isLoggingIn) {

        } else {
            try {
                const response = await fetch('http://localhost:5000/auth/signup', {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        username: event.username.value,
                        email: event.email.value,
                        password: event.password.value
                    })
                })

                const responseData = await response.json()
                console.log(responseData)
            } catch (err) {
                console.log(err)
            }
        }

        authContext.login()
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