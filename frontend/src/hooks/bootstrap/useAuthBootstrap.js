import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth, setAuthLoadingDone } from '../../redux/slice';
import axios from 'axios';

const useAuthBootstrap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const checkUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
          withCredentials: true,
        });

        if (res.data) {
          dispatch(setAuth({
            user: res.data,
            role: res.data.role,
            token: null,
          }));
        } else {
          dispatch(setAuthLoadingDone()); // ✅ done if not found
        }
      } catch (err) {
        console.error("User not logged in or token expired");
        dispatch(setAuthLoadingDone()); // ✅ done if error
      }
    };

    checkUser();
  }, [dispatch]);
};

export default useAuthBootstrap;
