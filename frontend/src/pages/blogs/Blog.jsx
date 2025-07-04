import React, { useEffect, useState, useRef } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogIndex, setExpandedBlogIndex] = useState(null);
  const summaryRefs = useRef([]);
  const [visibleReadMore, setVisibleReadMore] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend or localStorage where doctor posts were saved
    const savedBlogs = JSON.parse(localStorage.getItem('doctor_blogs')) || [];

    // Fallback if nothing is saved
    const fallbackBlogs = [
      {
        title: "How to Stay Fit Naturally",
        summary:
          "Tips on healthy living without equipment. Simple workouts, home-based fitness, hydration and nutritious diet can be enough to maintain good health if done consistently.",
        authorName: "Dr. Meera",
        authorEmail: "meera@example.com",
        date: "2025-07-01",
      },
      {
        title: "Managing Stress Through Food",
        summary:
          "Stress can be managed through proper eating habits. Learn about foods rich in omega-3, magnesium, and tryptophan that help reduce anxiety and improve mood.",
        authorName: "Dr. Ravi",
        authorEmail: "ravi@example.com",
        date: "2025-07-02",
      },
    ];

    const blogData = savedBlogs.length > 0 ? savedBlogs : fallbackBlogs;

    setBlogs(blogData);
  }, []);

  useEffect(() => {
    const results = summaryRefs.current.map((el) => {
      if (!el) return false;
      return el.scrollHeight > el.offsetHeight;
    });
    setVisibleReadMore(results);
  }, [blogs]);

  return (
    <div>
      <DashNavbar />
      <div className='w-[90%] mx-auto lg:w-[85%]'>
        <div className='text-center my-8'>
          <h1 className='text-3xl lg:text-4xl font-bold text-red-600 mb-2'>Health Blog</h1>
          <p className='text-gray-600 text-base sm:text-lg italic'>
            Insights from doctors to help you stay healthy
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className='py-3 flex flex-col gap-6'>
            {blogs.map((blog, index) => {
              const isExpanded = expandedBlogIndex === index;
              return (
                <div
                  key={index}
                  className='border-2 bg-white border-red-600 flex flex-col p-5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01]'
                >
                  <p className='text-sm text-gray-500 italic mb-1'>{blog.date}</p>
                  <h3 className='text-xl font-semibold text-red-700 lg:text-2xl italic mb-2'>{blog.title}</h3>
                  <p
                    ref={(el) => (summaryRefs.current[index] = el)}
                    className={`text-gray-800 text-[0.95rem] break-words transition-all ease-in-out duration-300 ${
                      !isExpanded ? 'line-clamp-3' : ''
                    }`}
                  >
                    {blog.summary}
                  </p>
                  {visibleReadMore[index] && (
                    <button
                      onClick={() =>
                        setExpandedBlogIndex(isExpanded ? null : index)
                      }
                      className='text-blue-600 italic text-sm font-semibold underline mt-1 w-fit'
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                  <div className='mt-4 pt-3 border-t border-gray-300'>
                    <p className='font-medium text-sm text-gray-800'>
                      {blog.authorName}
                    </p>
                    <p className='text-xs text-gray-500'>{blog.authorEmail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className='text-center text-gray-500 italic mt-10'>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
