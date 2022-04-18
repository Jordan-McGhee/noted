import React from 'react';

import PostItem from "./PostItem"
import "./PostList.css"

const PostList = props => {
    return (
        <ul>
            { props.items.map((item) => (
                <PostItem
                    key={ item.id }
                    user={ item.user }
                    content={ item.content }
                    date={ item.date }
                />
            ))}
        </ul>
    )
}

export default PostList