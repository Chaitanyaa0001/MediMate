import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import AppointmentModal from '../appointmentform/Appointform';
import { usegetdoctor } from '../../hooks/usedoctorhook/usegetdoctor';
import { usebook } from '../../hooks/bookings/usebook';
import { MdOutlineArticle } from 'react-icons/md';

const DoctorQuickBook = () => {
  const { user } = useSelector((state) => state.auth);
  const { fetchdoctor, doctordata } = usegetdoctor();
  const { bookdoctor } = usebook();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    patientname: user?.username || '',
    email: user?.email || '',
    symptoms: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    fetchdoctor();
  }, [fetchdoctor]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor?.userId) return;

    try {
      await bookdoctor({
        ...appointmentForm,
        doctorId: selectedDoctor.userId,
      });
    } catch (error) {
      console.error("Booking failed:", error);
    }

    setSelectedDoctor(null);
    setAppointmentForm({
      patientname: user?.username || '',
      email: user?.email || '',
      symptoms: '',
      date: '',
      time: '',
    });
  };

  return (
    <div className='w-[90%] mx-auto my-4 lg:w-[85%]'>
      <h2 className="text-2xl font-bold text-blue-700 mt-4 sm:text-2xl lg:text-4xl">Quick Doctor Booking</h2>
      <p className='opacity-70 italic text-[1rem] mb-2'>check the bookings</p>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-red-600 h-[100%]">
        {!doctordata || doctordata.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-yellow-50 p-6 rounded-xl border-3 border-red-600 shadow-md shadow-gray-400 animate-pulse">
            <MdOutlineArticle className="text-yellow-500 text-6xl mb-2" />
            <p className="text-lg text-yellow-700 font-medium">
              No doctors available right now. Please check back later.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
            {doctordata.slice(0, 3).map((doctor) => (
              <div
                key={doctor._id}
                className="border border-gray-300 rounded-lg p-3 shadow-md shadow-gray-500 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-gray-800 text-xl">
                  {doctor.firstname} {doctor.lastname}
                </h3>
                <p className="text-[1rem] opacity-70 italic font-semibold mb-3">{doctor.medicaldegree}</p>
                <p className="text-[1rem] text-gray-500"> {doctor.timings}</p>
                <p className='italic'>₹{doctor.charges}</p>
                <button
                  className="mt-1 px-2 py-2 bg-red-600 text-white text-sm rounded hover:bg-green-700 transition"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedDoctor?.userId && (
            <AppointmentModal
              doctor={selectedDoctor}
              formData={appointmentForm}
              onClose={() => setSelectedDoctor(null)}
              onChange={handleFormChange}
              onSubmit={handleAppointmentSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorQuickBook;
