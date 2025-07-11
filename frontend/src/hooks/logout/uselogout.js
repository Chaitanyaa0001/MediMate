// ✅ hooks/logout/uselogout.js
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../redux/slice";

const BASE_URL = import.meta.env.VITE_API_URL;

export const uselogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      // Clear redux state
      dispatch(clearAuth());

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Logout error in axios:", err.message);
    }
  };

  return { logout };
};
