import React from "react";
import CommentItem from "./CommentItem";

const CommentList = (props) => {
    return (
        <ul className="comment-list">
            { props.items.map((item) => (
                <CommentItem
                    key={ item.commentID }
                    user={item.user}
                    content={item.content}
                    
                />
            ))}
        </ul>
    )
}

export default CommentList