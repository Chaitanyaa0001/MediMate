import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Getstarted from './pages/getstarted/Getstarted'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';






const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Getstarted/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>

      </Routes>
    </>
  )
}

export default App