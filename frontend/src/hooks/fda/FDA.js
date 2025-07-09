import axios from "axios";
import { useState } from "react";

export const usefda = () => {
  const [fdaData, setfdaData] = useState([]);

  const getfda = async (query) => {
    if (!query) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fda`, {
        params: { query },
        withCredentials: true,
      });
      setfdaData([res.data]); // wrap in array
    } catch (err) {
      console.error("FDA axios error", err);
      setfdaData([]);
    }
  };

  return { fdaData, getfda };
};
