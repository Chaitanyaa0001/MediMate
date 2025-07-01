import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [menuopen, setmenuopen] = useState(false);
  const togglemenu = () => {
    setmenuopen(!menuopen);
  };

  return (
    <div className='shadow-md w-full relative'>
      <div className='flex justify-between items-center py-4 px-4 sm:px-16 lg:px-24'>
        
        {/* Left Section */}
        <div className='flex justify-between items-center gap-7'> 
          <div>
            <img src={logo} alt="logo" className='h-12 w-12 object-cover rounded-[5px]' />
          </div>
          <div className='hidden sm:block'>
            <h1 className='text-red-600'>MediMate</h1>
            <p className='opacity-75'>Your AI Medical Assistant </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-4 items-center">
          {/* Hamburger always visible on mobile */}
          <span className='sm:hidden text-3xl cursor-pointer' onClick={togglemenu}>
            <RxHamburgerMenu />
          </span>

          {/* Desktop Buttons */}
          <div className='hidden sm:flex gap-4'>
            <button className='text-blue-700 px-7 py-2 rounded-[5px]'>Signup</button>
            <button className='bg-red-700 text-white px-7 py-2 rounded-[5px]'>Signin</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only when menuopen is true) */}
      {menuopen && (
        <div className="sm:hidden flex flex-col items-center gap-2 bg-white py-4 px-6 absolute top-full left-0 w-full shadow-md z-50">
          <button className="text-blue-700 w-full text-left px-4 py-2 rounded-[5px] hover:bg-blue-50">
            Signup
          </button>
          <button className="bg-red-700 text-white w-full text-left px-4 py-2 rounded-[5px] hover:bg-red-600">
            Signin
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
