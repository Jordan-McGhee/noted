import { DUMMY_FRIENDS } from "./../../DUMMY/DummyStuff"

import React from "react";
import { useParams } from "react-router-dom";

import "./Friends.css"
import FriendList from "../Home/Components/Friends/FriendList";


const Friends = () => {

    const params = useParams()

    return (
        <div className="friend-page">
            <FriendList items={ DUMMY_FRIENDS } className="friend-page-list" />
        </div>
    )
}

export default Friends