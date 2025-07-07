import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Getstarted from './pages/getstarted/Getstarted';
import Signin from './pages/auth/signin/Signin'
import Signup from './pages/auth/signup/Signup';

// Patient Pages
import PatientDashboard from './pages/dashboard/PatientDashboard';
import BookAppointment from './pages/appoitnments/BookAppointment';
import Blog from './pages/blogs/Blog';

// Doctor Pages
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import ManageAppointments from './pages/appoitnments/ManageAppointment';
import Postblog from './pages/blogs/Postblog';
import Register from './pages/register/Register';


import { useSelector } from 'react-redux';

// Common
import Chats from './pages/chats/Chats';
import Settings from './pages/settings/Settings';
import FDA from './pages/fda/FDA';



const App = () => {
    const { role, isAuthenticated } = useSelector((state) => state.auth);

 return (
    <Routes>
      <Route path="/" element={<Getstarted />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/fda' element={<FDA />} />

      {isAuthenticated && role === 'patient' && (
        <>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/appointments" element={<BookAppointment />} />
          <Route path="/patient/blogs" element={<Blog />} />
        </>
      )}

      {isAuthenticated && role === 'doctor' && (
        <>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<ManageAppointments />} />
          <Route path="/doctor/blogs" element={<Postblog />} />
          <Route path="/doctor/register" element={<Register />} />
        </>
      )}

      <Route path="/chats" element={<Chats />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
