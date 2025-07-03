import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';

const Postblog = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "How to Stay Fit Naturally",
      summary: "Tips on healthy living without equipment. Stay active through daily walking, yoga, home exercises, and maintaining a balanced routine that supports both physical and mental well-being.",
      authorName: "Dr. Meera",
      authorEmail: "meera@example.com",
      date: "2025-07-01"
    },
    {
      title: "Managing Stress Through Food",
      summary: "Diet habits that reduce mental stress. Incorporating magnesium-rich foods like bananas, spinach, dark chocolate, and drinking enough water can have a positive effect on mood and stress levels.",
      authorName: "Dr. Ravi",
      authorEmail: "ravi@example.com",
      date: "2025-07-02"
    },
    {
      title: "Importance of Sleep",
      summary: "Why your body and mind need good rest. Deep sleep helps the brain reset, improves memory, and strengthens the immune system.",
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
    <div>
      <DashNavbar />
      <div className="p-6 lg:w-[85%] mx-auto min-h-[90vh]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-red-700">Health Blog</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1 font-medium">
              Read stories, advice, and updates from doctors and patients.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 sm:mt-0 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            {showForm ? 'Close Form' : '✍️ Post a Blog'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handlePostBlog} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-red-700 mb-2">📝 Write a Blog</h2>
            <label className="block font-medium text-gray-700">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border rounded-md px-4 py-2 mt-1 focus:ring-2 ring-red-300"/>
            <label className="block font-medium text-gray-700">Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={4} className="w-full border rounded-md px-4 py-2 mt-1 focus:ring-2 ring-red-300"/>
            <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">Publish Blog</button>
          </form>
        )}

        {/* Blog Cards */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📚 Recent Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition min-h-[200px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-4">{blog.summary}</p>
                </div>
                <p className="text-gray-500 text-xs mt-4">
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
