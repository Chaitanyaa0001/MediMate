import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Submitted:', signupData);
  };

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center '>
      <div className='flex flex-col justify-center items-center gap-1 mb-2   '>
        <img src={logo} alt="logo" className='w-[70px] sm:w-[100px] lg:w-[150px]' />
        <h1 className='text-3xl text-red-600 mb-2 lg:text-4xl'>Join MediMate</h1>
        <h2 className='text-xl opacity-55'>Create your free account</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-100 justify-between w-[70%] m-3 h-[500px] sm:w-[50%] sm:h-[500px] lg:w-[30%] lg:h-[500px] p-5 rounded-[8px] shadow-lg shadow-black"
      >
        <h1 className="text-2xl text-red-600 font-bold">Sign Up</h1>

        <div className="w-full">
          <label className="text-sm text-gray-600">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={signupData.username}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={signupData.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={signupData.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <span className="text-sm text-center mt-2">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 underline">
            Signin
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
