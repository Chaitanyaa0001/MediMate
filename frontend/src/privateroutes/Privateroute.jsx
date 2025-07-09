import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/signin" />;
  if (role && userRole !== role) return <Navigate to="/signup" />;

  return children;
};

export default Privateroute;
