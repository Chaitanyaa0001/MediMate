import React, { useState, useRef, useEffect } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FaPen } from 'react-icons/fa';

const Postblog = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "How to Stay Fit Naturally",
      summary: "Tips on healthy living without wejfn3breobfoq34'erfhou4herwphgfpiyw54gyrf4wy 5iegrf4wyp5erigfiyp4g5ii45wg gw t4 gw 4tugh ut4r gu4 eu[g hu4 hguwhs[tghwu4hgpw4ughsi4rgequipment qbdihvewfhgq3yoc4gfy3iegwofrbyu34lbrhf3gq4lgfh3q4legvrfh34h;rvg34hfr g3igfi 3bgriutg3iu tu54iu gt3q5hgiq4t5 bgreiyge4bg;k aeigtib45'gi;e4b5eigb45;iyhgbrbgrebgrekbgerbgogrbherghbgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg.",
      authorName: "Dr. Meera",
      authorEmail: "meera@example.com",
      date: "2025-07-01"
    },
    {
      title: "Managing Stress Through Food",
      summary: "Diet habits that reduce mewrf3hfuiwegfb3irueg3wli4ykgtbfi;beyrgfbiya;erwsgfbway;rikhgfbiay;erkhgfbyerihfgbrwiyefjga;riwyekgfbs;yerikjgfbiesy;krjgfhbviyershkgfbveriykh gieryug hfsierujh gfiersu; ghis;eru ghliserykujh gsriuejg hsegiurkjtfhg irstkj gh;siue4rkj ghisyerukj ghiersukj ghrsieukjf ghirsutkjegh rsieukjgh se4iru;dugh se4iur ;gjh s4e;oruh gs9e;uorjdh ginersu;kjdfhg nersiu;kjf ghvns; eriughs;eriudfkjntal stress.",
      authorName: "Dr. Ravi",
      authorEmail: "ravi@example.com",
      date: "2025-07-02"
    },
    {
      title: "Importance of Sleep",
      summary: "Why your boderkhbgfi;sekrhfneirkjgfberikjgbfihkjdzghbiuserkjhgi;eruskjgheruosdj;khgaenourgfhaeru'ojlghenr'oujgherujgh eourjgh eruojfg hoeu;sjh ou;sjetgh oeutgh e'ougha3er ghi;auerjgh 'eosuljh geruiokj;ha s;i shert ;uoj she4oru;jg hesuor;j h4eosur;j hgseou;rjgh es4ourgkl ha4jruoeay h45oeu he54tougj tsrh outrl;kh toril 4tr'odilk4r'stl hj54outry and mind need good rest.",
      authorName: "Dr. Anjali",
      authorEmail: "anjali@example.com",
      date: "2025-07-01"
    },
  ]);

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
  }, [blogs]);

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
    setBlogs(prev => [...prev, newBlog]);
    setFormData({ title: '', summary: '' });
    setShowForm(false);
    alert("Blog Posted Successfully");
  };

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
            {showForm ? 'Close Form' : ' Post a Blog'}
          </button>
        </div>
        {/* Form */}
        {showForm && (
          <form onSubmit={handlePostBlog} className='flex flex-col border-2 bg-white border-gray-400 rounded-xl p-3 py-5 shadow-md shadow-gray-500 lg:w-[80%] lg:mx-auto'>
            <h2 className='text-blue-600 text-2xl font-semibold mb-4 bg-white'>Write a Blog</h2>
            <label className='text-xl italic mb-3'>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="border border-gray-500 focus:outline-none focus:border-2 focus:border-red-600 p-1.5 rounded-[6px] mb-4" />
            <label className='text-xl italic mb-3'>Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={4} className='border border-gray-500 focus:outline-none focus:border-2 focus:border-red-600 p-1.5 rounded-[6px] mb-4' />
            <button className='border-2 border-red-700 p-2 w-[40%] rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer'>Publish Blog</button>
          </form>
        )}
        {/* Blog Cards */}
        <div>
          <h2 className='text-2xl text-red-600 italic  font-semibold my-5 sm:text-3xl lg:text-4xl'>Recent Blogs</h2>
          <div className='py-3 flex flex-col gap-5'>
            {blogs.map((blog, index) => {
              const isExpanded = expandedBlogIndex === index;
              return (
                <div key={index} className='border-2 bg-white  border-red-600 flex flex-col p-5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] animate-fade-in'>
                  <p className='text-sm  sm: lg:text-[1.1rem] italic opacity-80'>{blog.date}</p>
                  <h3 className='text-xl font-semibold lg:text-3xl italic mb-2'>{blog.title}</h3>
                  <p ref={(el) => (summaryRefs.current[index] = el)} className={`opacity-80 text-gray-700 break-words transition-all ease-in-out duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>{blog.summary}</p>
                  {visibleReadMore[index] && (
                    <button className='text-blue-600 italic text-[1rem] font-semibold underline mt-1 w-fit' onClick={() => setExpandedBlogIndex(isExpanded ? null : index)}>{isExpanded ? 'Read less' : 'Read more'}</button>
                  )}
                  <p className=' font-medium mt-6 lg:text-xl '> {blog.authorName}</p>
                  <p className='text-[1rem] text-gray-500 '>{blog.authorEmail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postblog;
