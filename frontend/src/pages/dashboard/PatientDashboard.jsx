import React from 'react';
import Googlefitdata from '../../components/dashboardcomponents/Googlefitdata';
import Quickactions from '../../components/dashboardcomponents/Quickactions';
import DashNavbar from '../../components/navbars/DashNavbar';
import Dashblogs from '../../components/dashboardcomponents/Dashblogs';
import DoctorQuickBook from '../../components/dashboardcomponents/DoctorQuickBook';




const PatientDashboard = () => {
  // Simulate backend response
  
  return (
    <>
      <DashNavbar/>
      <Googlefitdata/>
      <div className=''>
         <Quickactions/>
         <Dashblogs role='patient'/>
      </div>
      <DoctorQuickBook/>
     
     
    </>
  );
};

export default PatientDashboard;
