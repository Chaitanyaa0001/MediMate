import React from 'react'
import DashNavbar from '../../components/navbars/DashNavbar';
import Googlefitdata from '../../components/dashboardcomponents/Googlefitdata';
import Quickactions from '../../components/dashboardcomponents/Quickactions';
import Dashblogs from '../../components/dashboardcomponents/Dashblogs';
import DoctorDashboardAppointments from '../../components/dashboardcomponents/DoctorDashboardAppointments';


const DoctorDashboard = () => {
  return (
    <div>
      <DashNavbar/>
      <Googlefitdata/>
      <Quickactions/>
      <Dashblogs role='doctor'/>
      <DoctorDashboardAppointments/>

    </div>
  )
}

export default DoctorDashboard