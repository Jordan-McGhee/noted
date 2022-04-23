import React from "react";

import "./Profile.css"
import NewPost from "../Home/Components/Posts/NewPost";
import PostList from "../Home/Components/Posts/PostList";
import FriendList from "../Home/Components/Friends/FriendList";

const Profile = () => {

    const DUMMY_POSTS = [
        { id: "post1", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post ", date: "placeholder for date text"},
        { id: "post2", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is not a test post", date: "placeholder for date text"},
        { id: "post3", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Mom's test post", date: "placeholder for date text"},
        { id: "post4", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
        { id: "post5", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"},
        { id: "post6", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Mom's test post", date: "placeholder for date text"},
        { id: "post7", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
        { id: "post8", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"}
    ]

    const DUMMY_FRIENDS = [
        { id: "friend1", user: { name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend2", user: { name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend3", user: { name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend4", user: { name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend5", user: { name: "Christopher McGhee", email: "test5@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend6", user: { name: "Reid McGhee", email: "test6@test", numberOfPosts: 31, numberOfFriends: 69 }},
    ]

    return (
        <div className="profile-page">
            
            <div className="profile-left-side">
                <div className="profile-about-section">
                    <p>Stuff</p>
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