import { DUMMY_POSTS, DUMMY_FRIENDS } from "../../../DUMMY/DummyStuff";

import React from "react";

import NewPost from "../Components/Posts/NewPost";
import PostList from "../Components/Posts/PostList";
import FriendList from "../Components/Friends/FriendList";

const HomePage = () => {

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