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
        return <HeartPulse className="text-red-500 w-7 h-18" />;
      case 'bp':
        return <Gauge className="text-blue-500 w-6 h-18" />;
      case 'oxygen':
        return <Droplet className="text-green-500 w-6 h-18" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="p-6 lg:w-[85%] mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-blue-600 font-bold">
            Welcome back, User!
          </h2>
          <h3 className="text-[0.80rem] opacity-55 sm:text-[1rem]">
            Here's your health summary for today
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {userdata.map((data, index) => (
            <div key={index} className="bg-white shadow-md   shadow-gray-600 rounded-xl p-4 flex items-center justify-between ">
              <div>
                <h1 className="text-xl font-semibold sm:text-2xl lg:text-2xl mb-2">{data.title}</h1>
                <h1 className="text-lg text-gray-700">{data.measure}</h1>
              </div>
              <div>
                {getIcon(data.type)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Googlefitdata