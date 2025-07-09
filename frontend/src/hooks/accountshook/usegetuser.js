import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usegetuser = () => {
  const [userdata, setUserdata] = useState(null);

  const getuser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user`, {
        withCredentials: true, 
      });
      setUserdata(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return { getuser, userdata };
};
