import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { useGemini } from '../../hooks/usegeminihook/useChat';
import ReactMarkdown from 'react-markdown';

const suggestions = ['Fever', 'Headache', 'Chest Pain'];

const Chats = () => {
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState([]);
  const { sendprompt } = useGemini();

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMsg = { from: 'user', text: query };
    setChats(prev => [...prev, userMsg]);

    // Add typing placeholder
    setChats(prev => [...prev, { from: 'bot', text: 'MediMate is typing...' }]);
    setQuery('');

    const aiResponse = await sendprompt(query);

    setChats(prev => [
      ...prev.slice(0, -1), // remove typing
      { from: 'bot', text: aiResponse }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashNavbar />

      <div className="w-[90%] max-w-5xl mx-auto py-10 flex flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-red-600 italic animate-fade-in">
          Ask MediMate
        </h1>

        {/* Disclaimer Note */}
        <p className="text-center text-sm sm:text-base text-yellow-700 bg-yellow-100 border border-yellow-300 px-4 py-2 rounded-xl animate-pulse shadow-md max-w-3xl mx-auto mt-2">
          ⚠️ This prototype is intended for informational and recommendation purposes only.
          It is based on global medical datasets and should not replace professional consultation.
          Please consult or book a certified doctor for any medical condition.
        </p>

        <p className="text-lg sm:text-xl text-center text-gray-600 animate-fade-in mt-4">
          Your AI Medical Assistant – Just describe your symptoms
        </p>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAsk();
            }}
            placeholder="e.g., I have chest pain and short breath"
            className="w-full sm:w-[75%] px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition"
          />
          <button
            onClick={handleAsk}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-medium w-full sm:w-auto"
          >
            Ask MediMate
          </button>
        </div>

        {/* Suggestion Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(item)}
              className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-full hover:bg-red-100 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col gap-4 mt-4">
          {chats.length === 0 && (
            <p className="text-center text-gray-500">No conversation yet. Ask something!</p>
          )}
          {chats.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[65%] px-4 py-3 rounded-xl text-left text-sm leading-relaxed whitespace-pre-wrap break-words shadow ${
                  msg.from === 'user'
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
