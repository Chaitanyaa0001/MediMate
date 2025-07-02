import React from 'react';
import Navbar from '../../components/navbar';
import Googlefitdata from '../../components/Googlefitdata';
import Quickactions from '../../components/Quickactions';
import Blogpost from '../../components/Blogpost';


const Dashboard = () => {
  // Simulate backend response
  
  return (
    <>
      <Navbar />
      <Googlefitdata/>
      <Quickactions/>
      <Blogpost/>
    </>
  );
};

export default Dashboard;
