import React, { useEffect, useState } from 'react';
import { MdOutlineArticle } from 'react-icons/md';
import { usegetblogs } from '../../hooks/blogshook/usegetblog';
import { useSelector } from 'react-redux';

const Dashblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { blogdata } = usegetblogs();
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !role || !blogdata) return;

    const lowerRole = role.toLowerCase();

    if (lowerRole === 'doctor') {
      const doctorBlogs = blogdata.filter(
        (blog) => blog.authorEmail === user.email
      );
      setBlogs(doctorBlogs);
    } else {
      setBlogs(blogdata);
    }
  }, [user, role, blogdata]);

  const heading =
    role?.toLowerCase() === 'doctor'
      ? 'Your Recent Blog Posts'
      : 'Latest Blogs by Doctors';

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 sm:text-3xl lg:text-4xl">
        📝 {heading}
      </h2>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300 shadow-md shadow-gray-400 animate-pulse">
          <MdOutlineArticle className="text-yellow-500 text-6xl mb-2" />
          <p className="text-lg text-yellow-700 font-medium">
            {role?.toLowerCase() === 'doctor'
              ? 'You have not uploaded any blogs yet.'
              : 'No blogs available right now.'}
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-red-600 max-h-[450px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow-sm border-2 border-gray-300 rounded-xl p-6 flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.summary}</p>
              <p className="text-sm text-gray-400 mt-4">
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
