import React, { useState, useEffect } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FiSearch } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import AppointmentModal from '../../components/appointmentform/Appointform';
import { usegetdoctor } from '../../hooks/usedoctorhook/usegetdoctor';
import { useSelector } from 'react-redux';
import { usebook } from '../../hooks/bookings/usebook';

const BookAppointment = () => {
  const { fetchdoctor, doctordata } = usegetdoctor();
  const { user } = useSelector((state) => state.auth);
  const { bookdoctor } = usebook();

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);
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

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredDoctors = doctordata.filter((doctor) =>
    (
      `${doctor.firstname} ${doctor.lastname} ${doctor.medicaldegree} ${doctor.biography}`
    ).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !selectedDoctor.userId) {
      console.error("Doctor or doctor.userId is missing", selectedDoctor);
      return;
    }

    console.log("Booking appointment with doctorId:", selectedDoctor.userId);

    try {
      const res = await bookdoctor({
        ...appointmentForm,
        doctorId: selectedDoctor.userId, // ✅ Correct userId
      });

      if (res) {
        console.log("Booking successful:", res);
      }
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
    <div>
      <DashNavbar />
      <div className='w-[85%] mx-auto my-8'>
        <h2 className='text-2xl text-red-600 sm:text-3xl lg:text-4xl'>Find Your Doctor</h2>
        <p className='opacity-70 italic text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem] mb-6'>
          Search and book appointments with trusted doctors
        </p>

        <div className='bg-white flex py-1 justify-center items-center rounded-[6px] shadow-md shadow-gray-400 border-2 border-red-600'>
          <FiSearch className='w-10 text-xl text-gray-500' />
          <input
            type='text'
            placeholder='Search by name, degree, or specialty'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-1 outline-none border-l border-gray-400'
          />
        </div>

        <div className='flex flex-col lg:flex-row flex-wrap gap-4 mt-4'>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => {
              const id = doctor._id;
              const isExpanded = expandedIds.includes(id);
              const shouldClamp = doctor.biography?.length > 150;

              return (
                <div
                  key={id}
                  className='border-2 border-red-600 rounded-lg p-4 bg-white shadow-md w-full lg:w-[45%] flex flex-col'
                >
                  <h3 className='text-xl font-semibold text-red-700 sm:text-2xl lg:text-3xl'>
                    {doctor.firstname} {doctor.lastname}
                  </h3>
                  <p className='opacity-80 italic mb-2'>{doctor.medicaldegree}</p>

                  <div className='text-sm sm:text-base flex flex-col gap-1 mb-2'>
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Phone:</strong> {doctor.phone}</p>
                    <p><strong>DOB:</strong> {doctor.dob}</p>
                    <p><strong>Gender:</strong> {doctor.gender}</p>
                    <p><strong>Experience:</strong> {doctor.experienceyear} years</p>
                    <p><strong>Certificates:</strong> {doctor.certificates}</p>
                    <p><strong>Charges:</strong> ₹{doctor.charges}</p>
                    <p><strong>Availability:</strong> {doctor.timings}</p>
                  </div>

                  <p className='font-bold'>Biography:</p>
                  <p className={`break-words ${!isExpanded && shouldClamp ? 'line-clamp-3' : ''}`}>
                    {doctor.biography}
                  </p>
                  {shouldClamp && (
                    <button
                      onClick={() => toggleExpand(id)}
                      className='text-blue-600 mt-1 hover:underline'
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}

                  <button
                    className='mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
                    onClick={() => {
                      if (!doctor.userId) {
                        console.error("No userId found in doctor object:", doctor);
                        return;
                      }
                      setSelectedDoctor(doctor);
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              );
            })
          ) : (
            <p className='mt-4'>No doctors found matching your search.</p>
          )}
        </div>
      </div>

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
  );
};

export default BookAppointment;
