import React from "react";
import { useParams } from "react-router-dom";

import "./Friends.css"
import FriendList from "../Home/Components/Friends/FriendList";


const Friends = () => {

    const params = useParams()

    const DUMMY_FRIENDS = [
        { userID: "friend1", name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend2", name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend3", name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 },
        { userID: "friend4", name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 }
    ]

    return (
        <div className="friend-page">
            <FriendList items={ DUMMY_FRIENDS } className="friend-page-list" />
        </div>
    )
}

export default Friends