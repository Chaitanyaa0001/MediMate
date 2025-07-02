import React, { useEffect, useState } from 'react';

const Dashblogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Simulate fetching from backend
  useEffect(() => {
    // Replace this with actual API call
    setBlogs([
      {
        title: '5 Ways to Stay Healthy',
        summary: 'Learn daily habits that can improve your well-being.',
        date: '2025-07-02'
      },
      {
        title: 'Importance of Sleep',
        summary: 'Sleep plays a vital role in good health and well-being.',
        date: '2025-06-25'
      }
    ]);
  }, []);

  return (
    <div className="p-6 lg:w-[85%] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Your Recent Blog Posts</h1>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 border border-yellow-300 rounded-md">
          You have not uploaded anything yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white p-4 border rounded-xl shadow-md cursor-pointer 
                         hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-1">{blog.summary}</p>
              <p className="text-sm text-gray-400 mt-2">{new Date(blog.date).toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashblogs;
