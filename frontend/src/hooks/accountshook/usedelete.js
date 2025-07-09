import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useDeleteUser = () => {
  const deleteUser = async (formdata) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/user`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  return { deleteUser };
};
