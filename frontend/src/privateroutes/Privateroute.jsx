// privateroutes/Privateroute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ children, role }) => {
  const { isAuthenticated, role: userRole, isAuthLoading } = useSelector((state) => state.auth);

  if (isAuthLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) return <Navigate to="/signin" />;
  if (role && userRole !== role) return <Navigate to="/signup" />;

  return children;
};

export default Privateroute;
