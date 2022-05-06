import React from "react";

const CommentItem = (props) => {

    return(
        <li>
            <h5>{ props.user.name }</h5>
            <p>{ props.content }</p>
        </li>
    )
}

export default CommentItem