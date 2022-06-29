import React, { useState, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css';
import MainNav from './Components/Nav/MainNav';
import Auth from './Pages/Auth/Auth';
import Friends from './Pages/Friends/Friends';
import HomePage from './Pages/Home/Pages/HomePage';
import Profile from './Pages/Profile/Profile';
import { AuthContext } from "./Context/auth-context"

function App() {

  const DUMMY_USERS = [
    { userID: "me", name: "Jordan McGhee", email: "me@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend1", name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend2", name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend3", name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend4", name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend5", name: "Christopher McGhee", email: "test5@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend6", name: "Reid McGhee", email: "test6@test", numberOfPosts: 31, numberOfFriends: 69 }
]


  // manage whether we are logged in or not app-wide with useState
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  // useCallback so these functions are only called once
  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])
  
  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let routes

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="user/:userID/friends" element = {<Friends />} />
        <Route path="user/:userID" element = {<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element = {<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    )
  }

  return (

      <div className="App">
        
        {/* pass the values of our functions to our auth-context file with the value prop */}
        <AuthContext.Provider value= { { isLoggedIn, login, logout} } >

          <MainNav />
          { routes }

        </AuthContext.Provider>

      </div>

  );
}

export default App;
