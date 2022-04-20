import React from 'react';
import { Route, Routes } from 'react-router-dom'

import './App.css';
import MainNav from './Components/Nav/MainNav';
import Auth from './Pages/Auth/Auth';
import Friends from './Pages/Friends/Friends';
import HomePage from './Pages/Home/Pages/HomePage';
import Profile from './Pages/Profile/Profile';

function App() {

  return (

      <div className="App">
        
        <MainNav />

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="auth" element = {<Auth />} />
          <Route path="friends" element = {<Friends />} />
          <Route path="user" element = {<Profile />} />

        </Routes>

      </div>

  );
}

export default App;
