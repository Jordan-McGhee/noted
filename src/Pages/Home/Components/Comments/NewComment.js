import React from 'react';

import "./NewComment.css"

const NewComment = () => {

    const commentSubmitHandler = (e) => {
        e.preventDefault()


    }

    return (
        <form className="new-comment" onSubmit={ commentSubmitHandler }>
            <input 
                type="text"
                name="new-comment"
                placeholder='Say something nice'
            />
            <button>Add Comment</button>
        </form>
    )
}

export default NewComment