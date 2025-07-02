import React, { useState } from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';

const Login = () => {
  const [logindata, setlogindata] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted:', logindata);
  };

  return (
    <div className='h-screen  w-full flex  flex-col justify-center items-center '> {/* full screen + centering */}
    <div className='flex flex-col justify-cener items-center gap-1 mb-8'>
      <img src={logo} alt="logo"  className='w-[100px]  sm:w-[130px] lg:w-[150px]'/>
      <h1 className='text-3xl text-red-600 mb-2  lg:text-4xl'>Welcome Back </h1>
      <h2 className='text-xl opacity-55 '>Sign In To Your MediMate Account </h2>
    </div>
      <form
        onSubmit={handleSubmit}
className="flex flex-col bg-gray-100 justify-between w-[70%]  h-[50%] sm:w-[50%] sm:h-[62%] lg:w-[30%] lg:h-[400px] p-5 rounded-[8px] shadow-lg shadow-black"
      >
        <h1 className="text-2xl text-red-600 font-bold text-shadow-red-600">Login</h1>

        <div className="w-full">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={logindata.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={logindata.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <h2 className='self-center'>google</h2>

        <span className="text-sm text-center my-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 underline">
            Sign up
          </Link>
        </span>
      </form>

    </div>
  );
};

export default Login;
