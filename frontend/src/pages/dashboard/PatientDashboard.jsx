import React from 'react';
import Googlefitdata from '../../components/dashboardcomponents/Googlefitdata';
import Quickactions from '../../components/dashboardcomponents/Quickactions';
import Blog from '../blogs/Blog';
import DashNavbar from '../../components/navbars/DashNavbar';



const PatientDashboard = () => {
  // Simulate backend response
  
  return (
    <>
      <DashNavbar/>
      <Googlefitdata/>
      <Quickactions/>
      <Blog role= 'patient'/>
    </>
  );
};

export default PatientDashboard;
