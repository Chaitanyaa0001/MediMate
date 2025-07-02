import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Getstarted from './pages/getstarted/Getstarted'
import Signin from './pages/signin/Signin'
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';







const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Getstarted/>} ></Route>
        <Route path="/signin" element={<Signin/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/dashboard" element={<Dashboard/>} ></Route>

        

      </Routes>
    </>
  )
}

export default App