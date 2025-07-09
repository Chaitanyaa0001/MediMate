import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { usePostDoctor } from '../../hooks/usedoctorhook/usepostdoctor';

const Register = () => {
  const { postDoctor } = usePostDoctor();

  const [registerdata, setregisterdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    medicaldegree: '',
    experienceyear: '',
    certificates: '',
    biography: '',
    charges: '',
    timings: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert number fields from string to actual number
const parsedValue = ['phone', 'charges', 'experienceyear'].includes(name)
  ? value === '' ? '' : Number(value)
  : value;


    setregisterdata((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postDoctor(registerdata);

      if (res) {
        setregisterdata({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          dob: '',
          gender: '',
          medicaldegree: '',
          experienceyear: '',
          certificates: '',
          biography: '',
          charges: '',
          timings: '',
        });
        console.log("posted", res);
      }
    } catch (err) {
      console.error("error while posting the doctor ", err.message);
    }
  };

  return (
    <div>
      <DashNavbar />
      <div className='w-[85%] mx-auto'>
        <h1 className='text-2xl text-red-600 font-bold sm:text-3xl lg:text-4xl mt-4'>Doctor Registration</h1>
        <p className='opacity-60 text-xs mb-4 sm:text-[1rem] lg:text-[1.25rem]'>Join our network of healthcare professionals. Please provide accurate information to help patients make informed decisions.</p>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5 mb-10'>
            <div className='bg-white p-2 rounded-[6px] lg:p-10 border-2 border-red-600 flex flex-col '>
              <h1 className='text-xl text-red-500 italic font-semibold sm:text-2xl lg:text-3xl'>Personal Information</h1>
              <p className='opacity-70 italic mb-1.5'>Basic personal details and contact information</p>

              <div>
                <h2 className='italic font-semibold sm:text-[1rem]'>First Name</h2>
                <input type="text" name="firstname" value={registerdata.firstname} onChange={handleChange} placeholder="First Name" required className='w-full mb-4 p-1.5 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
                <h2 className='italic font-semibold sm:text-[1rem]'>Last Name</h2>
                <input type="text" name="lastname" value={registerdata.lastname} onChange={handleChange} placeholder="Last Name" required className='w-full mb-4 p-1.5 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
              </div>

              <div>
                <h2 className='italic font-semibold sm:text-[1rem]'>Email</h2>
                <input type="text" name="email" value={registerdata.email} onChange={handleChange} placeholder="Email" required className='w-full p-1.5 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
                <h2 className='italic font-semibold sm:text-[1rem]'>Phone Number</h2>
                <input type="number" name="phone" value={registerdata.phone} onChange={handleChange} placeholder="Phone Number" required className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
              </div>

              <div>
                <h2 className='italic font-semibold sm:text-[1rem]'>Date Of Birth</h2>
                <input type="date" name="dob" value={registerdata.dob} onChange={handleChange} required className='w-full p-1.5 border-1 border-gray-400 mb-4 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
                <h2 className='italic font-semibold sm:text-[1rem]'>Gender</h2>
                <input type="text" name="gender" value={registerdata.gender} onChange={handleChange} placeholder="Gender" required className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
              </div>
            </div>

            <div className='bg-white p-2 rounded-[6px] lg:p-10 border-2 border-red-600 flex flex-col'>
              <h1 className='text-xl text-red-500 italic font-semibold sm:text-2xl lg:text-3xl'>Professional Information</h1>
              <p className='opacity-70 italic mb-1.5'>Medical License and Practice details</p>

              <div>
                <h2 className='italic font-semibold sm:text-[1rem]'>Medical Degree</h2>
                <input type="text" name="medicaldegree" value={registerdata.medicaldegree} onChange={handleChange} placeholder="e.g. MBBS, MD, DO" required className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
                <h2 className='italic font-semibold sm:text-[1rem]'>Year of Experience</h2>
                <input type="number" name="experienceyear" value={registerdata.experienceyear} onChange={handleChange} placeholder="e.g. 2020" required className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
              </div>

              <h2>Additional Certifications</h2>
              <textarea name="certificates" value={registerdata.certificates} onChange={handleChange} placeholder="Certificates, fellowships, or specialized training" className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]'></textarea>
            </div>

            <div className='bg-white p-2 rounded-[6px] lg:p-10 border-2 border-red-600 flex flex-col'>
              <h1 className='text-xl text-red-500 italic font-semibold sm:text-2xl lg:text-3xl mb-4'>Additional Information</h1>
              <h2 className='italic font-semibold sm:text-[1rem]'>Professional Biography</h2>
              <textarea name="biography" value={registerdata.biography} onChange={handleChange} placeholder="Brief biography" className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]'></textarea>
              <h2 className='italic font-semibold sm:text-[1rem]'>Charges</h2>
              <input type="number" name="charges" value={registerdata.charges} onChange={handleChange} placeholder="Consultation Charges" required className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
              <h2 className='italic font-semibold sm:text-[1rem]'>Availability</h2>
              <input type="text" name="timings" value={registerdata.timings} onChange={handleChange} placeholder="Available Timings" required className='w-full p-1.5 mb-4 border-1 border-gray-400 focus:outline-none focus:border-red-500 focus:border-2 rounded-[6px]' />
            </div>

            <button type="submit" className='w-[30%] border-2 py-1 bg-red-600 text-white rounded-[6px] hover:bg-red-700 cursor-pointer sm:w-[25%] sm:py-2'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
