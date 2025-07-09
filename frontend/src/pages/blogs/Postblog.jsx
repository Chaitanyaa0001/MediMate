import React, { useState, useRef, useEffect } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FaPen } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { usepostblog } from '../../hooks/blogshook/usepostblog';
import { usegetblogs } from '../../hooks/blogshook/usegetblog';

const Postblog = () => {
  const { role } = useSelector((state) => state.auth);
  const { createblog } = usepostblog();
  const { blogdata = [], fetchBlogs, loading, error } = usegetblogs();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', summary: '' });
  const [expandedBlogIndex, setExpandedBlogIndex] = useState(null);
  const summaryRefs = useRef([]);
  const [visibleReadMore, setVisibleReadMore] = useState([]);

  useEffect(() => {
    const results = summaryRefs.current.map((el) => {
      if (!el) return false;
      return el.scrollHeight > el.offsetHeight;
    });
    setVisibleReadMore(results);
  }, [blogdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostBlog = async (e) => {
    e.preventDefault();
    try {
      await createblog(formData);
      await fetchBlogs(); 

      setFormData({ title: '', summary: '' });
      setShowForm(false);
      alert("Blog posted successfully");
    } catch (err) {
      alert("Failed to post blog");
    }
  };

  if (role !== 'doctor') return null;

  return (
    <div>
      <DashNavbar />
      <div className='w-[90%] mx-auto lg:w-[85%]'>

        {/* Header */}
        <div className='lg:flex lg:justify-between lg:items-center my-6 py-3'>
          <div>
            <h1 className='text-2xl text-red-600 font-bold mb-1 sm:text-3xl lg:text-4xl'>Health Blog</h1>
            <p className='opacity-70 sm:text-xl'>Read stories, advice, and updates from doctors and patients.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className='flex items-center gap-1.5 justify-center text-white mt-5 border-2 border-red-700 bg-red-600 px-[0.5em] py-[0.3em] rounded-[7px] cursor-pointer lg:px-6 lg:py-3'>
            <FaPen className='text-white' />
            {showForm ? 'Close Form' : 'Post a Blog'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handlePostBlog} className='flex flex-col border-2 bg-white border-gray-400 rounded-xl p-3 py-5 shadow-md shadow-gray-500 lg:w-[80%] lg:mx-auto'>
            <h2 className='text-blue-600 text-2xl font-semibold mb-4'>Write a Blog</h2>
            <label className='text-xl italic mb-3'>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="border border-gray-500 p-2 rounded mb-4" />
            <label className='text-xl italic mb-3'>Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={4} className='border border-gray-500 p-2 rounded mb-4' />
            <button className='border-2 border-red-700 p-2 w-[40%] rounded-xl bg-red-600 text-white hover:bg-red-700'>Publish Blog</button>
          </form>
        )}

        {/* Blog List */}
        <h2 className='text-2xl text-red-600 italic font-semibold my-5 sm:text-3xl lg:text-4xl'>Recent Blogs</h2>

        {loading ? (
          <p className="text-center text-gray-500 italic animate-pulse">Loading blogs...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : blogdata.length === 0 ? (
          <p className="text-center italic text-gray-500 mt-4">No blogs till now!</p>
        ) : (
          <div className='py-3 flex flex-col gap-5'>
            {blogdata.map((blog, index) => {
              const isExpanded = expandedBlogIndex === index;
              return (
                <div key={index} className='border-2 bg-white border-red-600 flex flex-col p-5 rounded-md shadow-md hover:shadow-lg transition-all duration-300'>
                  <p className='text-sm italic text-gray-600'>{new Date(blog.date).toLocaleDateString()}</p>
                  <h3 className='text-xl font-semibold italic mb-2'>{blog.title}</h3>
                  <p
                    ref={(el) => (summaryRefs.current[index] = el)}
                    className={`text-gray-700 transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}
                  >
                    {blog.summary}
                  </p>
                  {visibleReadMore[index] && (
                    <button className='text-blue-600 text-sm underline mt-1' onClick={() => setExpandedBlogIndex(isExpanded ? null : index)}>
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                  <div className='mt-4 pt-3 border-t border-gray-300'>
                    <p className='font-medium text-sm'>{blog.authorName}</p>
                    <p className='text-xs text-gray-500'>{blog.authorEmail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Postblog;
