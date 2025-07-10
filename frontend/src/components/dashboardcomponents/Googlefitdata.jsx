import React, { useEffect, useState } from 'react';
import { HeartPulse, Gauge, Droplet } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Googlefitdata = () => {

  const { user } = useSelector((state) => state.auth);
  const username = user?.username || 'User';
  const [fitData, setFitData] = useState({
    heartRate: 'Loading...',
    bloodPressure: 'Loading...',
    oxygenLevel: 'Loading...'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/fit/data`, {
          withCredentials: true
        });

        const { heartRate, bloodPressure, oxygenLevel } = res.data;

        setFitData({ heartRate, bloodPressure, oxygenLevel });

        // Show toast if any value is missing
        if (
          heartRate === 'N/A' ||
          bloodPressure === 'N/A' ||
          oxygenLevel === 'N/A'
        ) {
          toast.warn('Please make sure Google Fit app is installed and has synced data.', {
            position: 'top-center'
          });
        }
      } catch (err) {
        console.error('❌ Error fetching Google Fit data:', err);
        setFitData({
          heartRate: 'Connect to Google Fit',
          bloodPressure: 'Connect to Google Fit',
          oxygenLevel: 'Connect to Google Fit'
        });
        toast.error('You must connect to Google Fit first.', {
          position: 'top-center'
        });
      }
    };

    fetchData();
  }, []);

  const connectGoogleFit = () => {
    window.open(`${BASE_URL}/api/fit/auth`, '_blank', 'noopener,noreferrer');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'heart': return <HeartPulse className="text-red-500 w-7 h-7 animate-pulse" />;
      case 'bp': return <Gauge className="text-blue-500 w-7 h-7 animate-bounce" />;
      case 'oxygen': return <Droplet className="text-green-500 w-7 h-7 animate-ping" />;
      default: return null;
    }
  };

  const dataArray = [
    { title: 'Heart Rate', measure: fitData.heartRate, type: 'heart' },
    { title: 'Blood Pressure', measure: fitData.bloodPressure, type: 'bp' },
    { title: 'Oxygen Level', measure: fitData.oxygenLevel, type: 'oxygen' }
  ];

  return (
    <div className="p-6 lg:w-[85%] mx-auto animate-fade-in">
      <ToastContainer />
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl text-blue-600 font-bold tracking-wide">
           Welcome back, {username}!

        </h2>
        <h3 className="text-sm opacity-70 sm:text-base italic mt-1">
          Here's your personalized health summary for today:
        </h3>
        <button
          onClick={() => {
            connectGoogleFit();
            setTimeout(() => window.location.reload(), 3000);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
        >
          Connect Google Fit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {dataArray.map((data, index) => (
          <div
            key={index}
            className="bg-white border-2 border-red-600 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">{data.title}</h1>
              <p className="text-lg text-gray-600 font-medium">{data.measure}</p>
            </div>
            <div>{getIcon(data.type)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Googlefitdata;
