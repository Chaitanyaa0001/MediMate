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

    setChats(prev => [...prev, { from: 'bot', text: 'MediMate is typing...' }]);
    setQuery('');

    const aiResponse = await sendprompt(query);

    setChats(prev => [
      ...prev.slice(0, -1),
      { from: 'bot', text: aiResponse }
    ]);
  };

  return (
    <div>
      <DashNavbar />

      <div className='w-[80%] mx-auto  flex flex-col  m-4'>
        <h1 className='text-3xl font-bold text-red-600 italic  sm:text-4xl lg:text-6xl'>Ask MediMate</h1>
        <p className='opacity-60 text-[1rem] mb-7 sm:text-xl lg:text-2xl'>Your AI Medical Assistant – Just describe your symptoms</p>

        <div>
          <div className='flex flex-col gap-4 sm:flex-row w-[100%]'>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className='p-2 rounded-[15px] border border-gray-500  focus:outline-none focus:border-2 focus:border-red-600 '
              onKeyDown={e => {
                if (e.key === 'Enter') handleAsk();
              }}
              placeholder="e.g., I have chest pain and short breath"
            />
            <button onClick={handleAsk} className=''>
              Ask MediMate
            </button>
          </div>

          <div>
            {suggestions.map((item, idx) => (
              <button key={idx} onClick={() => setQuery(item)}>
                {item}
              </button>
            ))}
          </div>

          <div>
            {chats.length === 0 && (
              <p>No conversation yet. Ask something!</p>
            )}
            {chats.map((msg, idx) => (
              <div key={idx}>
                <div>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
