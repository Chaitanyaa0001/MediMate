import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, CalendarCheck, FileHeart, Newspaper } from 'lucide-react';

const Quickactions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Chat with AI",
      icon: <Bot className="w-10 h-10 text-blue-600 lg:w-14 lg:h-14" />,
      path: "/chat"
    },
    {
      title: "Book Appointments",
      icon: <CalendarCheck className="w-10 h-10 text-green-600 lg:w-14 lg:h-14" />,
      path: "/appointments"
    },
    {
      title: "Health Records",
      icon: <FileHeart className="w-10 h-10 text-red-600 lg:w-14 lg:h-14" />,
      path: "/records"
    },
    {
      title: "Health Blogs",
      icon: <Newspaper className="w-10 h-10 text-purple-600 lg:w-14 lg:h-14" />,
      path: "/blogs"
    }
  ];

  return (
    <div className=" w-[90%]  lg:w-[85%] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 sm:text-3xl lg:text-4xl">
        🚀 Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border-2 border-red-600">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => navigate(action.path)}
            className="cursor-pointer bg-white shadow-sm  border-2 border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-md hover:scale-[1.01] transition-all duration-300 hover:bg-gray-100 
            "
          >
            {action.icon}
            <p className="mt-4 text-center text-gray-800 font-semibold text-lg lg:text-xl">
              {action.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quickactions;
