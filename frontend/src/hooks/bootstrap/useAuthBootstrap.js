// hooks/bootstrap/useAuthBootstrap.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setAuthLoadingDone } from '../../redux/slice';
import axios from 'axios';

const useAuthBootstrap = () => {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthLoading) return;

    const checkUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
          withCredentials: true,
        });

        if (res.data) {
          dispatch(setAuth({
            user: res.data,
            role: res.data.role,
            token: null, // token is in cookie
          }));
        } else {
          dispatch(setAuthLoadingDone());
        }
      } catch (err) {
        console.error("User not logged in or token expired");
        dispatch(setAuthLoadingDone());
      }
    };

    checkUser();
  }, [dispatch, isAuthLoading]);
};

export default useAuthBootstrap;
