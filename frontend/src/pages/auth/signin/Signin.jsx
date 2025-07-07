import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    email: '',
    password: '',
    role: 'patient' // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogindata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('medimate_role', logindata.role);
    if (logindata.role === 'doctor') {
      navigate('/doctor/register');
    } else {
      navigate('/patient/dashboard');
    }
    console.log('Login Submitted:', logindata);
  };

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-1 mb-8'>
        <img src={logo} alt="logo" className='w-[100px] sm:w-[130px] lg:w-[150px]' />
        <h1 className='text-3xl text-red-600 mb-2 lg:text-4xl'>Welcome Back</h1>
        <h2 className='text-xl opacity-55'>Sign In To Your MediMate Account</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-100 justify-between w-[70%] h-fit sm:w-[50%] lg:w-[30%] p-5 rounded-[8px] shadow-lg shadow-black gap-4"
      >
        <h1 className="text-2xl text-red-600 font-bold">Login</h1>

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

        {/* ✅ Role selection via radio buttons */}
        <div className="w-full">
          <label className="text-sm text-gray-600">Login as</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={logindata.role === 'patient'}
                onChange={handleChange}
              />
              <span>Patient</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={logindata.role === 'doctor'}
                onChange={handleChange}
              />
              <span>Doctor</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

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

export default Signin;
