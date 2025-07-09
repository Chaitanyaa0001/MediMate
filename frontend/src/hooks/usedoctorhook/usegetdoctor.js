import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usegetdoctor = () => {
  const [doctordata, setdoctordata] = useState([]);

  const fetchdoctor = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/doctors`, {
        withCredentials: true,
      });

      if (Array.isArray(res.data)) {
        setdoctordata(res.data);
      } else {
        console.error("Invalid doctor data response:", res.data);
        setdoctordata([]);
      }
    } catch (err) {
      console.error('error while fetching the doctors', err);
    }
  };

  useEffect(() => {
    fetchdoctor();
  }, []);

  return { fetchdoctor, doctordata };
};
