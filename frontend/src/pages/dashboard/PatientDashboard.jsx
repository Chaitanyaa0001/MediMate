import React from 'react';
import Navbar from '../../components/navbars/Navbar';
import Googlefitdata from '../../components/dashboardcomponents/Googlefitdata';
import Quickactions from '../../components/dashboardcomponents/Quickactions';
import Blogpost from '../../components/dashboardcomponents/Dashblogs';
import DashNavbar from '../../components/navbars/DashNavbar';



const PatientDashboard = () => {
  // Simulate backend response
  
  return (
    <>
      <DashNavbar/>
      <Googlefitdata/>
      <Quickactions/>
      <Blogpost/>
    </>
  );
};

export default PatientDashboard;
