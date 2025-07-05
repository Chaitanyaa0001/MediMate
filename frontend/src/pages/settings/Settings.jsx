import React, { useState } from 'react';
import DashaNavbar from '../../components/navbars/DashNavbar';
import Profile from '../../assets/Profile.jpg';

const Settings = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });
  const [passwords, setPasswords] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const Changeprofile = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const Submitprofile = (e) => {
    e.preventDefault();
    console.log('Profile Data:', profile);
  };

  const Changepassword = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitPassword = (e) => {
    e.preventDefault();
    console.log('Password Data:', passwords);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText.toLowerCase() === 'delete') {
      console.log('Delete account triggered');
    } else {
      console.log('Delete confirmation failed');
    }
  };

  return (
    <div>
      <DashaNavbar />
      <div className='w-[85%] mx-auto  flex justify-center items-center flex-col'>
        <h2 className='text-2xl text-red-600 font-bold mt-6 lg:text-4xl'>Account Settings</h2>
        <h3 className='opacity-70 text-[0.9rem] mb-6  lg:text-xl '>Manage your profile and account preferences</h3>
      </div>

      <div className='w-[90%] lg:w-[70%] mx-auto p-1'>
        <div className='bg-white flex flex-col lg:p-10 p-3 rounded-[8px] border-2 border-red-400'>
          <h1 className='text-2xl text-red-600 italic sm:text-3xl lg:4xl font-semibold'>Profile Information</h1>
          <p className='text-[0.85rem] opacity-70 sm:text-[0.95rem] lg:text-[1.5rem]'>Update Your Personal Details</p>
          <div className='my-6 flex flex-col items-center gap-2'>
            <img src={Profile} alt="profile" className='w-[30%] border-2 rounded-full sm:w-[20%] lg:w-[15%]' />
            <p className='italic opacity-50'>Click the photo to change it!!</p>
          </div>
          <form onSubmit={Submitprofile} className='flex flex-col items-start gap-1'>
            <h1 className='font-medium italic sm:text-xl '>Username</h1>
            <input type="text" name="username" value={profile.username} onChange={Changeprofile} className='border border-gray-400 rounded-[5px] w-[100%] p-1.5 focus:outline-none focus:border-2 focus:border-red-600 lg:p-2'/>
            <h1 className='font-medium italic sm:text-xl'>Email</h1>
            <input type="email" name="email" value={profile.email} onChange={Changeprofile}className='border border-gray-400 w-full p-1.5 rounded-[5px] focus:outline-none focus:border-2 focus:border-red-600 lg:p-2.5'/>
            <button className='bg-red-600 py-1 px-2 rounded-[6px] hover:bg-red-700 text-white mt-5 lg:px-7 sm:px-6 sm:py-2 lg:py-3'>Update Profile</button>
          </form>
        </div>
        <div className='bg-white border-2 my-5 border-red-500 rounded-[6px] p-2 lg:p-10'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl text-red-600 italic font-semibold'>Change Password</h1>
          <p className='text-[0.8rem] sm:text-[0.9rem] lg:text-[1.25rem] opacity-70 mb-6'>Update your password to keep your account safe</p>

          <form onSubmit={SubmitPassword} className='flex justify-center flex-col items-start gap-1'>
            <h1 className='italic font-medium'>Current Password</h1>
            <input type="password" name="oldPassword" value={passwords.oldpassword} onChange={Changepassword} className='border border-gray-400 w-full p-1.5 rounded-[5px] focus:outline-none focus:border-2 focus:border-red-600'/>
            <h1 className='italic font-medium'>New Password</h1>
            <input type="password" name="newPassword" value={passwords.newpassword} onChange={Changepassword} className='border border-gray-400 w-full p-1.5 rounded-[5px] focus:outline-none focus:border-2 focus:border-red-600'/>
            <h1 className='italic font-medium'>Confirm Password</h1>
            <input type="password" name="confirmPassword" value={passwords.confirmpassword} onChange={Changepassword}className='border border-gray-400 w-full p-1.5 rounded-[5px] focus:outline-none focus:border-2 focus:border-red-600'/>
            <button className='bg-red-600 py-1 px-2 rounded-[6px] hover:bg-red-700 text-white mt-5 lg:px-7 sm:px-6 sm:py-2 lg:py-3'>Change Password</button>
          </form>
        </div>
        <div className='bg-white border-2 border-red-600 p-2 rounded-[6px] lg:p-10'>
          <h1 className='text-2xl italic text-red-600 sm:text-3xl lg:text-4xl font-semibold'>Account Actions</h1>
          <p className='text-[0.8rem] opacity-80 mb-5'>Additional account management options</p>
          <div>
            <button type="button" onClick={() => setShowDeleteInput(!showDeleteInput)} className='bg-red-600 py-1 px-2 rounded-[6px] hover:bg-red-700 text-white mt-5 lg:px-7 sm:px-6 sm:py-2 lg:py-3'>Delete Account</button>
            {showDeleteInput && (
              <form className='flex justify-center flex-col items-start gap-1'>
                <input type="text" value={deleteConfirmText} placeholder='Type  "delete" to confirm'onChange={(e) => setDeleteConfirmText(e.target.value)} className='border border-gray-400 rounded-[6px] w-full p-1.5 bg-red-400 mt-1 placeholder:text-white placeholder:italic focus:outline-none focus:border-2 focus:border-red-600'/>
                <button className='hidden' onClick={handleDeleteAccount}>Confirm Delete</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
