import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Appointform = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    symptoms: '',
    date: '',
    time: '',
  });

  // Reset form when modal opens
  useEffect(() => {
    setFormData({ name: '',email:'',symptoms: '', date: '', time: '' });
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Appointment booked with ${doctor.firstname} ${doctor.lastname}\nDate: ${formData.date}\nTime: ${formData.time}\nSymptoms: ${formData.symptoms}`
    );
    onClose(); // Close modal after submit
  };

  if (!doctor) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-red-600 mb-4">
          Book Appointment with {doctor.firstname} {doctor.lastname}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          
          <textarea
            name="symptoms"
            placeholder="Symptoms"
            required
            value={formData.symptoms}
            onChange={handleChange}
            className="border p-2 rounded-md"
          ></textarea>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Appointform;
