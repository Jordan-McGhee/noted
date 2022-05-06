import React from "react";

import "./CommentItem.css"

const CommentItem = (props) => {

    return(
        <li className="comment-item">
            <h5>{ props.user.name }</h5>
            <p>{ props.content }</p>
        </li>
    )
}

export default CommentItem