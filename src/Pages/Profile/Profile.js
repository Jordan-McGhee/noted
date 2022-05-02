import { DUMMY_USERS, DUMMY_POSTS_PROFILE, DUMMY_FRIENDS } from "../../DUMMY/DummyStuff";

import React from "react";
import { useParams } from "react-router-dom";

import "./Profile.css"
import NewPost from "../Home/Components/Posts/NewPost";
import PostList from "../Home/Components/Posts/PostList";
import FriendList from "../Home/Components/Friends/FriendList";

const Profile = () => {

    const params = useParams()
    
    const user = DUMMY_USERS.find(({userID}) => userID === params.userID)
    console.log(user)


    return (
        <div className="profile-page">
            
            <div className="profile-left-side">
                <div className="profile-about-section">
                    <p>{user.name}'s Page!</p>
                </div>

                <div className="profile-friends-section">
                    <FriendList items={ DUMMY_FRIENDS } />
                </div>

            </div>


            <div className="profile-post-section">
                <NewPost />
                <PostList items={ DUMMY_POSTS_PROFILE } isProfilePosts = { true } />
            </div>
        </div>
    )
}

export default Profile