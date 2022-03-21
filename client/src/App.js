import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';

const App = (props) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile/:username' element={<Profile />} />
    </Routes>
  );
};

export default App;
