import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';

const suggestions = [
  "Fever", "Headache", "Chest Pain"
];

const Chats = () => {
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState([]);

  const handleAsk = () => {
    if (!query.trim()) return;
    const userMsg = { from: 'user', text: query };
    const botMsg = {
      from: 'bot',
      text: 'Thank you! MediMate is processing your symptoms...'
    };

    setChats(prev => [...prev, userMsg, botMsg]);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashNavbar />
      
      <div className="w-[85%] mx-auto py-10 text-center">
        <h1 className="text-2xl font-black text-red-700 mb-1 sm:text-3xl lg:text-5xl">Ask MediMate</h1>
        <p className="opacity-50 mb-6 text-[0.9rem] sm:text-xl  lg:text-2xl  ">Your AI Medical Assistant – Just describe your symptoms</p>

        {/* Input Box */}
        <div className="flex  justify-center items-center gap-2 flex-col  mb-6 sm:flex-row lg:w-[70%]  lg:mx-auto  ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                handleAsk();
              }
            }}
            placeholder="e.g., I have chest pain and short breath"
            className="  w-[100%] sm:flex-1  lg:flex-1 px-4 py-3 rounded-full border bg-white border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none "
          />
          <button
            onClick={handleAsk}
            className="bg-red-600 cursor-pointer  text-white px-5 py-2 rounded-full sm:px-6 sm:py-3  hover:bg-red-700 transition"
          >
            Ask MediMate
          </button>
        </div>

        {/* Suggestion Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(item)}
              className="px-4  cursor-pointer py-2 border border-red-300 text-red-700 rounded-full text-sm hover:bg-red-100 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className= "space-y-3 mt-6">
          {chats.length === 0 && (
            <p className="text-gray-600 text-center">No conversation yet. Ask something!</p>
          )}
          {chats.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.from === 'user'
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
