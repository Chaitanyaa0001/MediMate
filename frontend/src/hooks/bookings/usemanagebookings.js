import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useManageAppointments = () => {
  const [appointmentsdata, setAppointmentsdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/appointments`, {
        withCredentials: true,
      });
      setAppointmentsdata(res.data.appointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/appointments/status`,
        { appointmentId, status },
        { withCredentials: true }
      );

      const updated = res.data.appointment;
      setAppointmentsdata((prev) =>
        prev.map((appt) =>
          appt._id === updated._id ? { ...appt, status: updated.status } : appt
        )
      );
    } catch (err) {
      console.error("Failed to update appointment status:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointmentsdata, updateStatus, loading };
};
