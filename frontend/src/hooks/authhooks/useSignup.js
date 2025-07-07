import { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSignup = () => {
  const [signupData, setSignupData] = useState(null);

  const signup = async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmPassword,
          role: formData.role
        },
        {
          withCredentials: true
        }
      );

      setSignupData(response.data);
      return response.data; // for success callback if needed
    } catch (err) {
      console.error("Signup error", err);
    }
  };

  return { signup, signupData };
};

export default useSignup;
