import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostDoctor = () => {
  const postDoctor = async (formdata) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/doctors/register`, formdata, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error('Doctor registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  return { postDoctor };
};
