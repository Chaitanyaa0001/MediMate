import React, { useEffect, useState } from 'react';
import DashaNavbar from '../../components/navbars/DashNavbar';
import Profile from '../../assets/Profile.jpg';
import { usegetuser } from '../../hooks/accountshook/usegetuser';
import { useUpdateProfile } from '../../hooks/accountshook/useprofile';
import { useChangePassword } from '../../hooks/accountshook/usepassword';
import { useDeleteUser } from '../../hooks/accountshook/usedelete';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../redux/slice';

const Settings = () => {
  const { getuser, userdata } = usegetuser();
  const { updateProfile } = useUpdateProfile();
  const { changePassword } = useChangePassword();
  const { deleteUser } = useDeleteUser();

  const [profile, setProfile] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getuser();
  }, []);

  useEffect(() => {
    if (userdata) {
      setProfile({
        username: userdata.username || '',
        email: userdata.email || '',
      });
    }
  }, [userdata]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profile);
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New and confirm password do not match!');
      return;
    }
    await changePassword(passwords);
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() === 'delete') {
      await deleteUser();
      dispatch(clearAuth());
      navigate('/');
    } else {
      alert('Please type "delete" to confirm.');
    }
  };

  return (
    <div>
      <DashaNavbar />
      <div className='w-[85%] mx-auto flex justify-center items-center flex-col'>
        <h2 className='text-2xl text-red-600 font-bold mt-6 lg:text-4xl'>Account Settings</h2>
        <h3 className='opacity-70 text-[0.9rem] mb-6 lg:text-xl'>Manage your profile and account preferences</h3>
      </div>

      <div className='w-[90%] lg:w-[70%] mx-auto p-1'>
        {/* Profile Update */}
        <div className='bg-white flex flex-col lg:p-10 p-3 rounded-[8px] border-2 border-red-400'>
          <h1 className='text-2xl text-red-600 italic sm:text-3xl lg:text-4xl font-semibold'>Profile Information</h1>
          <p className='text-sm opacity-70'>Update Your Personal Details</p>
          <div className='my-6 flex flex-col items-center gap-2'>
            <img src={Profile} alt="profile" className='w-[30%] border-2 rounded-full sm:w-[20%] lg:w-[15%]' />
            <p className='italic opacity-50'>Click the photo to change it!!</p>
          </div>
          <form onSubmit={handleProfileSubmit} className='flex flex-col items-start gap-1'>
            <label className='italic'>Username</label>
            <input name="username" value={profile.username} onChange={handleProfileChange} className='border p-2 rounded w-full' />
            <label className='italic'>Email</label>
            <input name="email" value={profile.email} onChange={handleProfileChange} className='border p-2 rounded w-full' />
            <button className='bg-red-600 mt-4 text-white px-4 py-2 rounded hover:bg-red-700'>Update Profile</button>
          </form>
        </div>

        {/* Password Update */}
        <div className='bg-white border-2 my-5 border-red-500 rounded-[6px] p-4 lg:p-10'>
          <h1 className='text-2xl text-red-600 italic font-semibold'>Change Password</h1>
          <form onSubmit={handlePasswordSubmit} className='flex flex-col gap-2 mt-4'>
            <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} placeholder="Current Password" className='border p-2 rounded' />
            <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="New Password" className='border p-2 rounded' />
            <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm Password" className='border p-2 rounded' />
            <button className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>Change Password</button>
          </form>
        </div>

        {/* Delete Account */}
        <div className='bg-white border-2 border-red-600 p-4 rounded-[6px] lg:p-10'>
          <h1 className='text-2xl italic text-red-600 font-semibold'>Account Actions</h1>
          <button onClick={() => setShowDeleteInput(!showDeleteInput)} className='bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-700'>Delete Account</button>
          {showDeleteInput && (
            <div className='mt-4'>
              <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} placeholder='Type "delete" to confirm' className='border p-2 w-full bg-red-200 placeholder:text-white rounded' />
              <button onClick={handleDeleteAccount} className='mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800'>Confirm Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
