import React from "react";

import NewPost from "../Components/Posts/NewPost";
import PostList from "../Components/Posts/PostList";
import FriendList from "../Components/Friends/FriendList";

const HomePage = () => {

    const DUMMY_POSTS = [
        { id: "post1", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post ", date: "placeholder for date text"},
        { id: "post2", user: { name: "Tori McGhee", email: "test1@test"}, content: "This is not a test post", date: "placeholder for date text"},
        { id: "post3", user: { name: "Rhonda McGhee", email: "test2@test"}, content: "This is Mom's test post", date: "placeholder for date text"},
        { id: "post4", user: { name: "Thomas McGhee", email: "test3@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
        { id: "post5", user: { name: "Chris McGhee", email: "test4@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"}
    ]

    const DUMMY_FRIENDS = [
        { id: "friend1", user: { name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend2", user: { name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend3", user: { name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend4", user: { name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 }},
    ]

    return (
        <div className='app-body'>

            <div className='app-posts-section'>
                <NewPost />
                <PostList items={ DUMMY_POSTS.reverse() } />
            </div>

            <div className='vertical-line'></div>

            <div className='app-friends-section'>
                <FriendList items={ DUMMY_FRIENDS } />
            </div>

        </div>
    )
}

export default HomePage