import { DUMMY_POSTS_HOME, DUMMY_FRIENDS } from "../../../DUMMY/DummyStuff";

import React, { useEffect, useState } from "react";

import NewPost from "../Components/Posts/NewPost";
import PostList from "../Components/Posts/PostList";
import FriendList from "../Components/Friends/FriendList";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";
import ErrorModal from "../../../Components/UI/ErrorModal";

const HomePage = () => {
    
    const [ isLoading, setIsLoading ] = useState(false)
    const [ hasError, setHasError ] = useState(null)

    // update this one when backend route is fixed
    const [ loadedUsers, setLoadedUsers ] = useState()

    // useEffect so this get request only runs once and we don't get stuck in an infinite loop
    useEffect(() => {

        // function inside useEffect so we can use async/await
        const sendRequest = async () => {
            setIsLoading(true)

            // try/catch to communicate with backend
            try {
                const response = await fetch("http://localhost:5000/")

                const responseData = await response.json()
                setLoadedUsers(responseData.users)
                console.log(responseData)


                if (!response.ok) {
                    throw new Error(responseData.message)
                }

            } catch(err) {
                setHasError(err.message)
                console.log(`Entered error catch block on HomePage: ${err}`)
            }
            
            setIsLoading(false)
        }

        sendRequest()
    }, []) 

    const errorHandler = () => {
        setHasError(null)
    }

    return (
        <React.Fragment>
            
            { hasError && <ErrorModal error={ hasError } onClear = { errorHandler } />}

            { isLoading &&
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            }

            <div className='app-body'>

                <div className='app-posts-section'>
                    <NewPost />
                    <PostList items={ DUMMY_POSTS_HOME.reverse() } isProfilePosts = { false } />
                </div>

                <div className='vertical-line'></div>

                <div className='app-friends-section'>
                    {/* USING FRIENDLIST TO HOLD ALL USERS FOR NOW */}
                    { !isLoading && loadedUsers && <FriendList items={ loadedUsers } />}
                </div>

            </div>
        </React.Fragment>
    )
}

export default HomePage