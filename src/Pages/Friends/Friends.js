import React from "react";
import "./Friends.css"

import FriendList from "../Home/Components/Friends/FriendList";

const Friends = () => {

    const DUMMY_FRIENDS = [
        { id: "friend1", user: { name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend2", user: { name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend3", user: { name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 }},
        { id: "friend4", user: { name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 }},
    ]

    return (
        <div className="friend-page">
            <FriendList items={ DUMMY_FRIENDS } className="friend-page-list" />
        </div>
    )
}

export default Friends