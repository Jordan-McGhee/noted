import React from 'react';

import Card from "../../../Components/UI/Card"
import userIcon from "../../../Icons/user-placeholder.png"
import commentIcon from "../../../Icons/comment-placeholder.png"
import "./FriendItem.css"

const FriendItem = props => {
    return (
        <Card>
            <div className="friendItem-icon-name">
                <img src={ userIcon } alt="Profile icon" />
                <h3>{ props.user.name }</h3>
            </div>

            <div className="friendItem-posts-friends">

                <div className="posts-friends">
                    <img src={ commentIcon } alt="post icon"/>
                    <p>{ props.user.numberOfPosts } Posts</p>
                </div>

                <div className="posts-friends">
                    <img src={ userIcon } alt="user icon"/>
                    <p>{ props.user.numberOfFriends } Friends</p>
                </div>

            </div>
        </Card>
    )
}

export default FriendItem