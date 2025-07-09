import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useChangePassword = () => {
  const changePassword = async (data) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/user`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error('Error changing password:', err);
    }
  };

  return { changePassword };
};
