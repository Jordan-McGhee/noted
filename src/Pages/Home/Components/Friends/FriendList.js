import React from 'react';

import FriendItem from "./FriendItem"
import "./FriendList.css"


const FriendList = props => {
    return (
        <div className="friendList-main">
            <h1>Your Friends</h1>
            <ul>
                { props.items.map((friend) => (
                    <FriendItem
                        key={ friend._id }
                        user={ friend }
                    />
                ))}
            </ul>
        </div>
    )
}

export default FriendList