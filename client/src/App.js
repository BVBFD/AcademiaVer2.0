import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Messenger from './pages/Messenger/Messenger.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';

const App = ({ httpService }) => {
  return (
    <Routes>
      <Route path='/' element={<Home httpService={httpService} />} />
      <Route path='/login' element={<Login httpService={httpService} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route
        path='/profile/:username'
        element={<Profile httpService={httpService} />}
      />
      <Route path='/messenger' element={<Messenger />} />
    </Routes>
  );
};

export default App;
