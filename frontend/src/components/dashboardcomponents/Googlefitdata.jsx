import React from 'react'
import { HeartPulse, Gauge, Droplet } from 'lucide-react';

const Googlefitdata = () => {
  const userdata = [
    { title: "Heart Rate", measure: "72 BPM", type: "heart" },
    { title: "Blood Pressure", measure: "120/80 mmHg", type: "bp" },
    { title: "Oxygen Level", measure: "98%", type: "oxygen" }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'heart':
        return <HeartPulse className="text-red-500 w-7 h-7 animate-pulse" />;
      case 'bp':
        return <Gauge className="text-blue-500 w-7 h-7 animate-bounce" />;
      case 'oxygen':
        return <Droplet className="text-green-500 w-7 h-7 animate-ping" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:w-[85%] mx-auto animate-fade-in">
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl text-blue-600 font-extrabold tracking-wide">
          👋 Welcome back, User!
        </h2>
        <h3 className="text-sm opacity-70 sm:text-base italic mt-1">
          Here's your personalized health summary for today:
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {userdata.map((data, index) => (
          <div
            key={index}
            className="bg-white  border-2  border-red-600 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-4 flex items-center justify-between"
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
