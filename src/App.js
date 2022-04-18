import React from 'react';
import { Route, Routes } from 'react-router-dom'

import './App.css';
import MainNav from './Components/Nav/MainNav';
import HomePage from './Pages/Home/Pages/HomePage';

function App() {

  return (

      <div className="App">
        
        <MainNav />

        <Routes>

          <Route path ="/" element = {<HomePage />} />

        </Routes>

      </div>

  );
}

export default App;
