import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ children, role }) => {
  const { isAuthenticated, role: userRole,isAuthLoading } = useSelector((state) => state.auth);
  if (isAuthLoading) return null; // wait for auth bootstrap
if (!isAuthenticated) return <Navigate to="/signin" />;
if (role && userRole && userRole !== role) {
  const dashboard = userRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';
  return <Navigate to={dashboard} />;
}


  return children;
};

export default Privateroute;
