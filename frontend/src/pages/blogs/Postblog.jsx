import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FaPen } from 'react-icons/fa';


const Postblog = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "How to Stay Fit Naturally",
      summary: "Tips on healthy living without equipment.",
      authorName: "Dr. Meera",
      authorEmail: "meera@example.com",
      date: "2025-07-01"
    },
    {
      title: "Managing Stress Through Food",
      summary: "Diet habits that reduce mental stress.",
      authorName: "Dr. Ravi",
      authorEmail: "ravi@example.com",
      date: "2025-07-02"
    },
    {
      title: "Importance of Sleep",
      summary: "Why your body and mind need good rest.",
      authorName: "Dr. Anjali",
      authorEmail: "anjali@example.com",
      date: "2025-07-01"
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', summary: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: formData.title,
      summary: formData.summary,
      authorName: localStorage.getItem('medimate_name') || 'Unknown',
      authorEmail: localStorage.getItem('medimate_email') || 'unknown@example.com',
      date: new Date().toISOString().split('T')[0],
    };
    setBlogs(prevBlogs => [...prevBlogs, newBlog]);
    setFormData({ title: '', summary: '' });
    setShowForm(false);
    alert("Blog Posted Successfully ✅");
  };

  return (
    <div >
      <DashNavbar />
      <div className='w-[85%] mx-auto '>
        {/* Header */}
        <div className=' lg:flex  lg:justify-between lg:items-center my-6 border-2 border-amber-500  p-3 ' >
          <div>
            <h1 className='text-2xl  text-red-600 font-semibold  mb-1 sm:text-3xl lg:text-4xl' >Health Blog</h1>
            <p className='opacity-70 sm:text-xl '>Read stories, advice, and updates from doctors and patients.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className=' flex items-center gap-1.5 justify-center text-white mt-5 border-2 border-red-700  bg-red-600 px-[0.5em] py-[0.3em] rounded-[7px] cursor-pointer lg:px-6 lg:py-3 '>
            <FaPen className='text-white'/>
            {showForm ? 'Close Form' : ' Post a Blog'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handlePostBlog} className='flex flex-col border-2 bg-white  border-gray-300  rounded-xl p-2 shadow-md shadow-gray-500'>
            <h2 className='text-blue-600 text-2xl font-semibold my-3 bg-white'> Write a Blog</h2>
              <label className='text-xl text-blue-700 italic mb-3'>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className='border-1 border-gray-500  focus:border-2  focus:border-red-600  p-1.5 rounded-[6px] mb-4'/>
              <label className='text-xl text-blue-700 italic mb-3'>Summary</label>
              <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={4} className='border-2 border-blue-900'/>
              <button type="submit">Publish Blog</button>
          </form>
        )}

        {/* Blog Cards */}
        <div>
          <h2>📚 Recent Blogs</h2>
          <div>
            {blogs.map((blog, index) => (
              <div key={index}>
                <h3>{blog.title}</h3>
                <p>{blog.summary}</p>
                <p>
                  By {blog.authorName} ({blog.authorEmail}) | {blog.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postblog;
