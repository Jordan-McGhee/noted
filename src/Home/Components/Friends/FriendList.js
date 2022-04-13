import FriendItem from "./FriendItem"

import "./FriendList.css"


const FriendList = props => {
    return (
        <div className = "friendList-main">
            <h1>Your Friends</h1>
            <ul>
                { props.items.map((friend) => (
                    <FriendItem
                        key = { friend.id }
                        user = { friend.user }
                    />
                ))}
            </ul>
        </div>
    )
}

export default FriendList