import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { usesignin } from '../../../hooks/authhooks/useSignin';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../redux/slice';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signin, loading, error } = usesignin();
  const [googleError, setGoogleError] = useState(null);

  const [logindata, setlogindata] = useState({
    email: '',
    password: '',
    role: 'patient'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogindata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signin(logindata);
    if (result) {
      dispatch(setAuth({
        user: result.user,
        role: result.user.role,
        token: result.token,
      }));
      if (result.user.role === 'doctor') {
        navigate('/doctor/register');
      } else {
        navigate('/patient/dashboard');
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    if (!logindata.role) {
      setGoogleError('role-required');
      return;
    }
    try {
      const decoded = jwtDecode(response.credential);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, {
        email: decoded.email,
        username: decoded.name,
        profilePhoto: decoded.picture,
        role: logindata.role,
      }, {
        withCredentials: true
      });

      if (res.data) {
        dispatch(setAuth({
          user: res.data.user,
          role: res.data.user.role,
          token: res.data.token
        }));
        if (res.data.user.role === 'doctor') {
          navigate('/doctor/register');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (err) {
      setGoogleError('google-failed');
    }
  };

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center '>
      <div className='flex flex-col justify-center items-center mb-2'>
        <img src={logo} alt="logo" className='w-[90px] sm:w-[100px] lg:w-[150px]' />
        <h1 className='text-xl text-red-600  lg:text-4xl'>Welcome Back</h1>
        <h2 className='text-[1rem] opacity-55'>Sign In To Your MediMate Account</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-100 justify-between w-[90%] h-fit sm:w-[60%] lg:w-[30%] p-5 rounded-[8px] shadow-lg shadow-black gap-4"
      >
        <h1 className="text-2xl text-red-600 font-bold">Login</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {loading && <p className="text-blue-600 text-sm">Logging in...</p>}
        {googleError && (
          <p className="text-red-600 text-sm">
            {googleError === 'role-required' && 'Please select a role before signing in with Google.'}
            {googleError === 'google-failed' && 'Google sign-in failed. Please try again.'}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={logindata.email}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={logindata.password}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
        />

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

        <div className="w-full flex justify-center mt-2">
  <div className="p-[2px] border border-red-600 rounded-md">
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => setGoogleError('google-failed')}
      disabled={!logindata.role}
    />
  </div>
</div>


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
