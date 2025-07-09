import axios from 'axios';
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (update) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.put(`${BASE_URL}/api/user`, update, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setProfile(res.data);
      return res.data;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    profile,
    loading,
    error,
  };
};
