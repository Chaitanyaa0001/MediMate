import React from 'react';
import { HiShieldCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Freetrial = () => {
  return (
    <div className='w-full py-8 text-center'>
      <h2 className='text-2xl text-red-500 font-bold sm:text-3xl lg:text-4xl'>
        Ready To Transform Your Health
      </h2>
      <h3 className='text-xs mt-2 opacity-75 sm:text-xl lg:text-2xl'>
        Join thousands of users who trust MediMate for their healthcare needs. Start your journey to better health today.
      </h3>

      {/* Centered Icon and Button Text Side-by-Side */}
      <div className='mt-6 flex justify-center items-center'>
        <Link to="/signin">
          <button className='bg-red-600 text-white px-6 py-3 rounded-md text-[0.8rem] font-semibold hover:bg-red-700 transition flex items-center gap-2 sm:text-xl lg:text-2xl'>
            <HiShieldCheck className="text-xl text-white" />
            Start Your Free Trial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Freetrial;
