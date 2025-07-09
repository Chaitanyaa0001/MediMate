import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usegetblogs = () => {
  const [blogdata, setBlogdata] = useState([]);
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs`, {
        withCredentials: true,
      });
      setBlogdata(res.data.blogs); 
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogdata, fetchBlogs };
};
