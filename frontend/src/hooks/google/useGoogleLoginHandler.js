import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/slice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGoogleLoginHandler = (role) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post(`${BASE_URL}/api/auth/google`, {
        email: decoded.email,
        username: decoded.name,
        profilePhoto: decoded.picture,
        role, // ✅ sent from selected radio
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        dispatch(setAuth({
          user: response.data.user,
          role: response.data.user.role,
          token: response.data.token
        }));

        if (response.data.user.role === 'doctor') {
          navigate('/doctor/register');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed.');
    }
  };

  return { handleGoogleLoginSuccess };
};
