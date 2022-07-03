import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth-context";
import LoadingSpinner from "../../Components/UI/LoadingSpinner"

import "./Auth.css"

const Auth = () => {

    // FIRST
    // NEED A LOGGING UP AND SIGN IN FORM --done
    // NEED STATE TO DETERMINE WHICH FORM TO RENDER --done
    // STATE CHANGE HANDLER FOR WHEN BUTTON TO SWITCH IS PRESSED  --done
    // SUBMIT HANDLER FUNCTION --done
    // CONDITIONAL RENDERING OF FORM BEFORE RETURN STATEMENT --done
    
    // NEXT
    // VALIDATE FORM INPUTS --done
    // ERROR HANDLING --done
    // ONCHANGE & ONBLUR HANDLERS --done
    // STATES OR REFS FOR INPUTS --done
    // STYLING BASED ON FORM VALIDITY

    const authContext = useContext(AuthContext)

    const [ isLoggingIn, setIsLoggingIn ] = useState(true)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState()

    // STATES FOR LOGIN/SIGNUP FORM INPUTS TO TRACK VALUES
    const [ enteredUsername, setEnteredUsername ] = useState("")
    const [ enteredEmail, setEnteredEmail ] = useState("")
    const [ enteredPassword, setEnteredPassword ] = useState("")

    // STATES FOR IF INPUTS WERE TOUCHED, USED TO CHECK IF INPUTS ARE VALID BEFORE MOVING ON
    const [ usernameTouched, setUsernameTouched ] = useState(false) 
    const [ emailTouched, setEmailTouched ] = useState(false) 
    const [ passwordTouched, setPasswordTouched ] = useState(false)

    // variables to track validity and errors in inputs to prevent user from submitting form
    const usernameIsValid = enteredUsername.trim() !== ""
    const emailIsValid = enteredEmail.trim() !== "" && enteredEmail.includes("@")
    const passwordIsValid = enteredPassword.trim() !== "" && enteredPassword.trim().length > 6

    const usernameHasError = !usernameIsValid && usernameTouched
    const emailHasError = !emailIsValid && emailTouched
    const passwordHasError = !passwordIsValid && passwordTouched

    // variables for styling individual inputs depending on their validity
    const usernameInputClasses = !usernameHasError ? "form-control" : "form-control invalid"
    const emailInputClasses = !emailHasError ? "form-control" : "form-control invalid"
    const passwordInputClasses = !passwordHasError ? "form-control" : "form-control invalid"

    // determines if all inputs in form are valid for styling/preventing form submission
    let formIsValid = false

    // check whether logging in or signing up to determine form validity
    if (isLoggingIn) {
        if (emailIsValid && passwordIsValid) {
            formIsValid = true
        }
    } else {
        if (usernameIsValid && emailIsValid && passwordIsValid) {
            formIsValid = true
        }
    }


    // value change handlers
    const usernameChangeHandler = event => {
        setEnteredUsername(event.target.value)
    }

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value)
    }

    const passwordChangeHandler = event => {
        setEnteredPassword(event.target.value)
    }

    // input blur handlers
    const usernameBlurHandler = () => {
        setUsernameTouched(true)
    }
    
    const emailBlurHandler = () => {
        setEmailTouched(true)
    }
    
    const passwordBlurHandler = () => {
        setPasswordTouched(true)
    }

    // reset form handler
    const resetFormHandler = () => {
        setEnteredUsername("")
        setEnteredEmail("")
        setEnteredPassword("")

        setUsernameTouched(false)
        setEmailTouched(false)
        setPasswordTouched(false)
    }
    

    // establish form variable and store different version in form depending on logging in or signing up
    let loginForm

    if (isLoggingIn) {
        loginForm = 
            <div>

                {/* EMAIL INPUT */}
                <div className="form-field">
                    <label htmlFor="email" >Email</label>
                    <input id="email" type="text" name="email" value={ enteredEmail } onChange = { emailChangeHandler } onBlur = { emailBlurHandler }/>

                    { emailHasError && <p className = "error-text">Please enter a valid email.</p> }
                </div>

                {/* PASSWORD INPUT */}
                <div className="form-field">
                    <label htmlFor="password" >Password</label>
                    <input id="password" type="password" minLength="6" name="password" value={ enteredPassword } onChange = { passwordChangeHandler } onBlur = { passwordBlurHandler }/>

                    { passwordHasError && <p className = "error-text">Please enter a valid password. Must be 6 characters or longer</p> }
                </div>
                
            </div>

    } else {
        loginForm = 
            <div>
                
                {/* USERNAME INPUT */}
                <div className="form-field">
                    <label htmlFor="username" >Username</label>
                    <input id="username" type="text" name="username" value={ enteredUsername } onChange = { usernameChangeHandler } onBlur = { usernameBlurHandler }/>

                    { usernameHasError && <p className = "error-text">Please enter a valid username.</p> }
                </div>

                {/* EMAIL INPUT */}
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" value={ enteredEmail } onChange = { emailChangeHandler } onBlur = { emailBlurHandler } />

                    { emailHasError && <p className = "error-text">Please enter a valid email.</p> }
                </div>

                {/* PASSWORD INPUT */}
                <div className="form-field">
                    <label htmlFor="password" >Password</label>
                    <input id="password" type="password" minLength="6" name="password" value={ enteredPassword } onChange = { passwordChangeHandler } onBlur = { passwordBlurHandler }/>

                    { passwordHasError && <p className = "error-text">Please enter a valid password. Must be 6 characters or longer</p> }
                </div>
                
            </div>
    }


    // switches between login and signup forms
    const changeLoginHandler = () => {
        if (isLoggingIn) {
            setIsLoggingIn(false)
            resetFormHandler()
        } else {
            setIsLoggingIn(true)
            resetFormHandler()
        }
    }

    // when the form is submitted
    const formSubmitHandler = async (event) => {
        event.preventDefault()

        // if the form is invalid and was somehow submitted, cancel form submission
        if (!formIsValid) {
            return
        }

        if (isLoggingIn) {

            try{
                setIsLoading(true)
                const response = await fetch('http://localhost:5000/auth/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword
                    })
                })

                const responseData = await response.json()
                console.log(responseData)

                setIsLoading(false)
                authContext.login()

            } catch(err) {
                console.log(err)
                setError(err.message || "Something went wrong. Please try logging in again!")
            }


        } else {

            try {
                setIsLoading(true)
                const response = await fetch('http://localhost:5000/auth/signup', {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        username: enteredUsername,
                        email: enteredEmail,
                        password: enteredPassword
                    })
                })

                const responseData = await response.json()
                console.log(responseData)

                setIsLoading(false)
                authContext.login()
            } catch (err) {
                console.log(err)
                setError(err.message || "Something went wrong. Please try signing up again!")
            }
        }

        resetFormHandler()
    }

    return (
        <div>
            { isLoading && <LoadingSpinner asOverlay />}

            <p className="auth-p">
                { isLoggingIn ? "Login" : "Signup"}
            </p>

            <form onSubmit={ formSubmitHandler } className = "auth-form">
                
                { loginForm }

                <div>
                    <button type='submit' className="auth-form-button" disabled = { !formIsValid } onClick={ () => console.log("Clicked!")}>
                        { isLoggingIn ? "Login" : "Signup" }
                    </button>

                    <p onClick={ changeLoginHandler } className="switch-state-p">{ isLoggingIn ? "I need an Account" : "I already have an account"}</p>
                </div>
            </form>
        </div>
    )
}

export default Auth