import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usebook = () => {
  const bookdoctor = async (appointmentdata) => {
    const res = await axios.post(
      `${BASE_URL}/api/appointments`,
      appointmentdata,
      { withCredentials: true }
    );
    return res.data.appointment;
  };

  return { bookdoctor };
};
