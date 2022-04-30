import React from "react";
import { useParams } from "react-router-dom";

import "./Profile.css"
import NewPost from "../Home/Components/Posts/NewPost";
import PostList from "../Home/Components/Posts/PostList";
import FriendList from "../Home/Components/Friends/FriendList";

const Profile = () => {

    // DUMMY VARS PLACEHOLDERS
    const DUMMY_USERS = [
        { userID: "me", name: "Jordan McGhee", email: "me@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend1", name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend2", name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend3", name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend4", name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend5", name: "Christopher McGhee", email: "test5@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend6", name: "Reid McGhee", email: "test6@test", numberOfPosts: 31, numberOfFriends: 69 }
    ]

    const DUMMY_POSTS = [
        { postID: "post1", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post ", date: "placeholder for date text"},
        { postID: "post2", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is not a test post", date: "placeholder for date text"},
        { postID: "post3", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Mom's test post", date: "placeholder for date text"},
        { postID: "post4", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
        { postID: "post5", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"},
        { postID: "post6", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Mom's test post", date: "placeholder for date text"},
        { postID: "post7", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
        { postID: "post8", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"}
    ]

    const DUMMY_FRIENDS = [
        { userID: "friend1", name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend2", name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend3", name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend4", name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend5", name: "Christopher McGhee", email: "test5@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend6", name: "Reid McGhee", email: "test6@test", numberOfPosts: 31, numberOfFriends: 69 }
    ]

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
                <PostList items={ DUMMY_POSTS } />
            </div>
        </div>
    )
}

export default Profile