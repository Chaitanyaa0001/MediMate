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


// Common
import Chats from './pages/chats/Chats';
import Settings from './pages/settings/Settings';


const App = () => {
  const role = localStorage.getItem('medimate_role'); // get role after login

  return (
    <Routes>
      <Route path="/" element={<Getstarted />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Patient Routes */}
      {role === 'patient' && (
        <>
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/appointments" element={<BookAppointment />} />
          <Route path="/blogs" element={<Blog />} />
        </>
      )}

      {/* Doctor Routes */}
      {role === 'doctor' && (
        <>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<ManageAppointments />} />
          <Route path="/doctor/blogs" element={<Postblog />} />
        </>
      )}

      {/* Common Routes */}
      <Route path="/chats" element={<Chats />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
