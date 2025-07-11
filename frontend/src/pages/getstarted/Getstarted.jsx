import React from 'react';
import { FiHeart } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'; 
import { GiArtificialIntelligence } from 'react-icons/gi';
import { FaRegNewspaper } from 'react-icons/fa';
import { MdIntegrationInstructions,MdDashboard} from 'react-icons/md';
import Freetrial from '../../components/getstarted/Freetrial';
import Footer from '../../components/Footer';
import Navbar from '../../components/navbars/Navbar';


const Getstarted = () => {
  const heathdata =[
    {
      logo:  <GiArtificialIntelligence  />,
      title: " AI Chat",
      content:" get instant Medical Advise and answer to your health questions form our AI Powered medical assistant "
    },
    {
      logo: <MdDashboard/>,
      title: " SmartDashBoard",
      content:"Track your health metrics,manage appointnment, and monitor your wellness journey in one place"
    },
    {
      logo: <MdIntegrationInstructions/>,
      title: " OpenFDA Integration",
      content:"Access the latest FDA-aproved treatnmnets,drug-information , and medical device data "
    },
    {
      logo:<FaRegNewspaper/>,
      title:"Health Blog",
      content:"Share your Health Journey, read medical insights , and connect with a community of health-consious individuals"
    }
  ]
    const data = [
    {
      logo: "🕑",
      title: "AI Support",
      content: "Round-the-clock Medical Assistance"
    },
    {
      logo: "💬",
      title: "Instant Chat",
      content: "Quick answers from AI anytime"
    },
    {
      logo: "📊",
      title: "Insights",
      content: "Visualize your medical journey"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col  items-center justify-center mt-2 mx-auto text-center w-[90%] h-[100%]">
        <img src={logo} alt="logo" className="w-[150px] mb-2 sm:w-[180px] lg:w-[200px]" />
        <h1 className="text-3xl font-bold text-red-600 mb-1 ">MediMate</h1>
        <span className="text-gray-500 mb-2 lg:text-xl">Your AI Medical Assistant</span>
        <p className="opacity-85 mb-7 sm:text-2xl sm:px-8 lg:text-3xl ">
          Experience the future of healthcare with our medical technical assistant.
          Get personalized health advice, track your wellness, and access FDA-approved
          medical information – all in one secure platform.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-row">
          <Link to="/signin">
            <button className="bg-red-600 text-white px-5 py-2 cursor-pointer rounded flex items-center gap-2">
              <FiHeart className="text-white" />
              Get Started Free
            </button>
          </Link>
          <Link to="/signin">
           <button className="border border-blue-600 text-blue-600 px-5 py-2 w-[100%] cursor-pointer rounded">
             Sign In
           </button>
          </Link>
        </div>
        <div className='my-18 p-4'>
          <h1 className='text-3xl font-bold text-red-500 mb-3 sm:text-4xl lg:text-4xl'>Comprehensive Health Management</h1>
          <p className='text-xs mb-6 opacity-60 sm:text-[0.7rem] lg:text-2xl'>
            Everything you need to take control of your health journey, powered by AI and backed by science
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heathdata.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-2xl p-4 text-left">
                <div className="text-3xl text-blue-600 mb-2">{item.logo}</div>
                <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                <p className="text-gray-700 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="my-4 p-4 w-full ">
          <h1 className="text-2xl font-bold text-red-500 mb-10 sm:text-4xl lg:text-3xl">Why Choose Us?</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div key={index} className="bg-white shadow p-4 rounded-lg text-centre">
                <div className="text-2xl mb-2 font-bold text-red-400 sm:text-3xl  lg:text-4xl">{item.logo}</div>
                <h2 className="font-semibold  mb-3 text-xl sm:text-2xl  lg:text-3xl ">{item.title}</h2>
                <p className="text-gray-700 text-xl sm:text-xl lg:text-2xl">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Freetrial/>
      <Footer/>
    </>
  );
};

export default Getstarted;
