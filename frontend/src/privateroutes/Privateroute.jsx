// src/privateroutes/Privateroute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ children, role }) => {
  const { isAuthenticated, role: userRole, isAuthLoading } = useSelector((state) => state.auth);

  if (isAuthLoading) return null;

  if (!isAuthenticated) return <Navigate to="/signin" />;

  // Block access if role mismatch (e.g., patient trying to access doctor route)
  if (role && userRole !== role) {
    return <p className="text-center text-red-500 mt-10">Access Denied: You are not authorized to view this page.</p>;
  }

  return children;
};

export default Privateroute;
