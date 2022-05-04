import React from 'react';

import PostItem from "./PostItem"
import "./PostList.css"

const PostList = props => {
    return (
        <ul className='post-list'>
            { props.items.map((item) => (
                <PostItem
                    key={ item.postID }
                    user={ item.user }
                    content={ item.content }
                    date={ item.date }
                    profilePost={ props.isProfilePosts }
                    comments={item.comments ? item.comments : 0}
                />
            ))}
        </ul>
    )
}

export default PostList