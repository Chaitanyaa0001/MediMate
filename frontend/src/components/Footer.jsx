import React from 'react';
import logo from '../assets/logo.png';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className='bg-red-300 py-6 px-4 text-white'>
      <div className='flex flex-col items-center justify-center text-center gap-2'>
        {/* Logo */}
        <img src={logo} alt="logo" className='w-[70px] sm:w-[90px] lg:w-[110px]' />

        {/* Tagline */}
        <h2 className='text-[0.85rem] opacity-70 sm:text-[1rem] lg:text-xl'>
          Your trusted AI Medical Assistant
        </h2>

        {/* Made with love */}
        <div className='flex items-center justify-center gap-2 text-[0.95rem]'>
          <span>Made with</span>
          <FiHeart className="text-red-400 text-lg" />
          <span>by Chaitanya Khurana</span>
        </div>

        {/* Copyright */}
        <p className='text-xs opacity-75 mt-1'>
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
