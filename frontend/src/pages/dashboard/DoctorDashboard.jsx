import React from 'react'
import DashNavbar from '../../components/navbars/DashNavbar';
import Googlefitdata from '../../components/dashboardcomponents/Googlefitdata';
import Quickactions from '../../components/dashboardcomponents/Quickactions';
import Blogpost from '../../components/dashboardcomponents/Dashblogs';


const DoctorDashboard = () => {
  return (
    <div>
      <DashNavbar/>
      <Googlefitdata/>
      <Quickactions/>
      <Blogpost role= "doctor"/>
    </div>
  )
}

export default DoctorDashboard