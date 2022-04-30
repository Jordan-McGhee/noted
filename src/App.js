import React from 'react';
import { Route, Routes } from 'react-router-dom'

import './App.css';
import MainNav from './Components/Nav/MainNav';
import Auth from './Pages/Auth/Auth';
import Friends from './Pages/Friends/Friends';
import HomePage from './Pages/Home/Pages/HomePage';
import Profile from './Pages/Profile/Profile';

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

  return (

      <div className="App">
        
        <MainNav />

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="auth" element = {<Auth />} />
          <Route path="user/:userID/friends" element = {<Friends />} />
          <Route path="user/:userID" element = {<Profile />} />

        </Routes>

      </div>

  );
}

export default App;
