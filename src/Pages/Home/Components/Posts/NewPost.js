import React, { useState } from 'react';

import "./NewPost.css"
import { useFetch } from '../../../../Hooks/http-hook';

const NewPost = () => {

    const { isLoading, hasError, sendRequest, clearError } = useFetch()
    const [ enteredPost, setEnteredPost ] = useState("")

    const postChangeHandler = event => {
        setEnteredPost(event.target.value)
    }

    const resetFormHandler = () => {
        setEnteredPost("")
    }

    const formIsValid = enteredPost !== ""

    const formSubmitHandler = async (event) => {
        event.preventDefault()

        if (!formIsValid) {
            return
        }

        try {
            await sendRequest(
                // URL
                'http://localhost:5000/post/create',
                // METHOD
                'POST',
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({
                    postCreator: '62bf8545699ab9d359d3ba01',
                    content: enteredPost
                })
            )
        } catch(err) {
            // empty because error handling is done in our hook
        }

        resetFormHandler()
    }

    return (
        <form className="home-newPost" onSubmit={ formSubmitHandler }>
            <input 
                type="text"
                name="new-post"
                placeholder='Add a new note'
                value={ enteredPost }
                onChange = { postChangeHandler }
            />
            <button type='submit' disabled={ !formIsValid }>POST</button>
        </form>
    )
}

export default NewPost