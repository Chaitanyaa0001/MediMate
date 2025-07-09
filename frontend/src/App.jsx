import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Getstarted from './pages/getstarted/Getstarted';
import Signin from './pages/auth/signin/Signin';
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

// Common
import Chats from './pages/chats/Chats';
import Settings from './pages/settings/Settings';
import FDA from './pages/fda/FDA';

// Auth wrapper
import Privateroute from './privateroutes/Privateroute';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Getstarted />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/fda" element={<FDA />} />

      {/* Patient Protected Routes */}
      <Route
        path="/patient/dashboard"
        element={
          <Privateroute role="patient">
            <PatientDashboard />
          </Privateroute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <Privateroute role="patient">
            <BookAppointment />
          </Privateroute>
        }
      />
      <Route
        path="/patient/blogs"
        element={
          <Privateroute role="patient">
            <Blog />
          </Privateroute>
        }
      />

      {/* Doctor Protected Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <Privateroute role="doctor">
            <DoctorDashboard />
          </Privateroute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <Privateroute role="doctor">
            <ManageAppointments />
          </Privateroute>
        }
      />
      <Route
        path="/doctor/blogs"
        element={
          <Privateroute role="doctor">
            <Postblog />
          </Privateroute>
        }
      />
      <Route
        path="/doctor/register"
        element={
          <Privateroute role="doctor">
            <Register />
          </Privateroute>
        }
      />

      {/* Common Protected Routes */}
      <Route
        path="/chats"
        element={
          <Privateroute>
            <Chats />
          </Privateroute>
        }
      />
      <Route
        path="/settings"
        element={
          <Privateroute>
            <Settings />
          </Privateroute>
        }
      />
    </Routes>
  );
};

export default App;
