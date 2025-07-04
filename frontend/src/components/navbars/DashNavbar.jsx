import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

const DashNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuitems, setmenuitems] = useState(false);

  const toggle = () => setmenuitems(!menuitems);

  const role = localStorage.getItem('medimate_role'); // 'doctor' or 'patient'

  const handleLogout = () => {
    localStorage.removeItem('medimate_role');
    navigate('/signin');
  };

  // Base navigation items (common to both)
  const navItems = [
    ...(role === 'doctor'
      ? [{ name: 'Register', path: `/${role}/register` }]
      : []),
    { name: 'Dashboard', path: `/${role}/dashboard` },
    {name:'Drug Info (FDA)', path : '/fda'},
    { name: 'Chats', path: '/chats' },
    { name: 'Appointments', path: `/${role}/appointments` },
    { name: 'Blogs', path: `/${role}/blogs` },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-full shadow-md bg-white z-50">
      {/* Top Navbar */}
      <div className="flex items-center justify-between w-[85%] mx-auto py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-[60px]" />
          <h2 className="text-xl font-bold hidden sm:block">MediMate</h2>
        </div>

        {/* Navigation Links - visible on large screens */}
        <div className="hidden lg:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logout button on large screen */}
        <div className="hidden lg:block">
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Icon - visible only on small screens */}
        <div className="lg:hidden">
          <button onClick={toggle} className="text-3xl text-gray-700">
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuitems && (
        <div className="lg:hidden px-4 pb-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setmenuitems(false)}
                className={`block px-4 py-2 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-red-600 text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashNavbar;
