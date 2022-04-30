import React, { useState } from 'react';

import Card from "../../../../Components/UI/Card"
import userIcon from "../../../../Icons/user-placeholder.png"
import heartIcon from "../../../../Icons/heart-placeholder.png"
import commentIcon from "../../../../Icons/comment-placeholder.png"
import "./PostItem.css"

const PostItem = props => {

    const [ showComments, setShowComments ] = useState(false)

    const showCommentHandler = () => {
        if (showComments) {
            setShowComments(false)
        } else {
            setShowComments(true)
        }
    }

    return (
        <Card className="post-card">

            <div>

                <div className="post-name-date-section">
                    
                    <img src={ userIcon } alt="user icon" />

                    <div className="user-info">
                        <h3>{ props.user.name }</h3>
                        <p>{ props.date }</p>
                    </div>
                </div>

                <div className="content">
                    <p>
                        { props.content }
                    </p>
                </div>
                
                <div className="post-likes-comments">
                    
                    <div className="post-likes">
                        <img src={ heartIcon } alt="heart icon" />
                        <p>31</p>
                    </div>

                    <div className="post-comments">
                        <img src={ commentIcon } alt="comment icon" />
                        <p>12</p>
                    </div>

                    <div className="post-view-comments" onClick={ showCommentHandler }>
                        
                        <p>{ showComments ? "Hide Comments" : "View Comments"}</p>
                        
                    </div>
                </div>

                { showComments &&
                    <div className='post-comment-section'>
                        <h3>Comments!</h3>
                    </div>
                }

            </div>
        </Card>
    )
}

export default PostItem