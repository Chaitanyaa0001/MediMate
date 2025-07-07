import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slice"; // ✅ check your path

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usesignin = () => {
  const dispatch = useDispatch();
  const [signindata, setsignindata] = useState(null);

  const signin = async (formdata) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/signin`,
        {
          email: formdata.email,
          password: formdata.password,
          role: formdata.role
        },
        { withCredentials: true }
      );

     dispatch(setAuth({
  user: res.data.user,           // ✅ updated
  role: res.data.user.role,      // ✅ updated
  token: res.data.token
}));

      setsignindata(res.data);
      return res.data;
    } catch (err) {
      console.error("Signin error", err);
    }
  };

  return { signin, signindata };
};
