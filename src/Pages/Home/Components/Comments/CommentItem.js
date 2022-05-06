import React from "react";

const CommentItem = (props) => {
    <div>
        <h5>{ props.user.userID }</h5>
        <p>{ props.content }</p>
    </div>
}

export default CommentItem