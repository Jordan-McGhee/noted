import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from "../../../../Components/UI/Card"
import CommentList from '../Comments/CommentList';
import userIcon from "../../../../Icons/user-placeholder.png"
import heartIcon from "../../../../Icons/heart-placeholder.png"
import commentIcon from "../../../../Icons/comment-placeholder.png"
import "./PostItem.css"

const PostItem = props => {

    const [ showComments, setShowComments ] = useState(false)

    // TOGGLES SHOW COMMENT STATE
    const showCommentHandler = () => {
        if (showComments) {
            setShowComments(false)
        } else {
            setShowComments(true)
            console.log(`Comments: ${props.comments}`)
        }
    }



    // VARIABLES FOR IF WE ARE ON SIGNED IN USER'S PAGE OR THEY'RE VISITING ANOTHER PROFILE
    let postInfo

    if (props.profilePost) {
        postInfo = 
        <div className="post-name-date-section">

            <img src={ userIcon } alt="user icon" />

            <div className="user-info">
                <h3>{ props.user.name }</h3>
                <p>{ props.date }</p>
            </div>

        </div>

    } else {
        postInfo =
        <div className="post-name-date-section">           

                <img src={ userIcon } alt="user icon" />

                <div className="user-info">
                    <Link to={`/user/${props.user.userID}`}>
                        <h3>{ props.user.name }</h3>
                    </Link>
                    <p>{ props.date }</p>
                </div>

        </div>
    }

    // VARIABLES FOR IF POST HAS COMMENTS, DYNAMICALLY RENDERS DIFFERENT STUFF
    const hasComments = <CommentList items={props.comments} />

    const noComments = <p>There's nothing here. Add a new comment?</p>

    return (
        <Card className="post-card">

            <div>

                { postInfo }

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

                    {/* <div className="post-comments">
                        <img src={ commentIcon } alt="comment icon" />
                        <p>{props.comments ? props.comments.length : 0}</p>
                    </div> */}

                    <div className="post-view-comments" onClick={ showCommentHandler }>
                        
                        {/* <p>{ showComments ? "Hide Comments" : "View Comments"}</p> */}
                        
                        <div className="post-comments" onClick={()=>console.log(props.comments)}>
                            <img src={ commentIcon } alt="comment icon" />
                            <p>{props.comments ? props.comments.length : 0}</p>
                        </div>

                    </div>
                </div>


                    { showComments &&
                        <div className='post-comment-section'>
                            { props.comments ? hasComments : noComments}
                        </div>
                    }

            </div>
        </Card>
    )
}

export default PostItem