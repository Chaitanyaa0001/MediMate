import React, { useEffect, useState } from 'react';
import { MdOutlineArticle } from 'react-icons/md';

const Dashblogs = ({ role }) => {
  const [blogs, setBlogs] = useState([]);
  const loggedInEmail = localStorage.getItem('medimate_email');

  useEffect(() => {
    const allBlogs = [
      {
        title: '5 Ways to Stay Healthy',
        summary: 'Learn daily habits that can improve your well-being.',
        date: '2025-07-02',
        authorName: 'Dr. Arjun Mehta',
        authorEmail: 'arjun@medimate.com',
      },
      {
        title: 'Importance of Sleep',
        summary: 'Sleep plays a vital role in good health and well-being.',
        date: '2025-06-25',
        authorName: 'Dr. Priya Sharma',
        authorEmail: 'priya@medimate.com',
      },
      {
        title: 'Managing Stress Effectively',
        summary: 'Explore ways to manage stress in daily life.',
        date: '2025-06-20',
        authorName: 'Dr. Arjun Mehta',
        authorEmail: 'arjun@medimate.com',
      }
    ];

    if (role === 'doctor') {
      const doctorBlogs = allBlogs.filter(blog => blog.authorEmail === loggedInEmail);
      setBlogs(doctorBlogs);
    } else {
      setBlogs(allBlogs);
    }
  }, [role, loggedInEmail]);

  const heading =
    role === 'doctor' ? 'Your Recent Blog Posts' : 'Latest Blogs by Doctors';

  return (
    <div className="p-6 lg:w-[85%] mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">{heading}</h1>
      </div>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-yellow-50 p-6 rounded-md shadow-md shadow-gray-500 animate-pulse">
          <MdOutlineArticle className="text-yellow-500 text-6xl mb-2" />
          <p className="text-lg text-yellow-700 font-medium">
            {role === 'doctor'
              ? 'You have not uploaded any blogs yet.'
              : 'No blogs available right now.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white p-4 border rounded-xl shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
            >
              <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-1">{blog.summary}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(blog.date).toDateString()} — {blog.authorName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashblogs;
