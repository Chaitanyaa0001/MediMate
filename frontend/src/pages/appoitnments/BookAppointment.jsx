import React, { useState, useEffect } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FiSearch } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import AppointmentModal from '../../components/appointmentform/Appointform';

const dummyDoctors = [
  {
    id: 1,
    firstname: 'Aryan',
    lastname: 'Sharma',
    email: 'aryan.sharma@example.com',
    phone: '9876543210',
    dob: '1985-05-12',
    gender: 'Male',
    medicaldegree: 'MBBS, MD',
    experienceyear: '10',
    medicalschool: 'AIIMS Delhi',
    certificates: 'Fellowship in Endocrinology',
    biography: 'Expert in internal medicine and diabetes management.',
    charges: '500',
    timeings: '10:00 AM - 4:00 PM',
  },
  {
    id: 2,
    firstname: 'Priya',
    lastname: 'Verma',
    email: 'priya.verma@example.com',
    phone: '9123456780',
    dob: '1990-03-22',
    gender: 'Female',
    medicaldegree: 'BDS, MDS',
    experienceyear: '5',
    medicalschool: 'Maulana Azad Dental College',
    certificates: 'Implantology, Cosmetic Dentistry',
    biography: 'Dental specialist with a passion for healthy smiles.',
    charges: '300',
    timeings: '11:00 AM - 3:00 PM',
  }
];

const BookAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    symptoms: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    setDoctors(dummyDoctors);
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredDoctors = doctors.filter((doctor) =>
    (
      `${doctor.firstname} ${doctor.lastname} ${doctor.medicaldegree} ${doctor.biography}`
    ).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    alert(
      `Appointment booked with ${selectedDoctor.firstname} ${selectedDoctor.lastname} on ${appointmentForm.date} at ${appointmentForm.time}`
    );
    setSelectedDoctor(null);
    setAppointmentForm({ name: '', symptoms: '', date: '', time: '' });
  };

  return (
    <div>
      <DashNavbar />
      <div className='w-[85%] mx-auto my-8'>
        <h2 className='text-2xl text-red-600 sm:text-3xl lg:text-4xl'>Find Your Doctor</h2>
        <p className='opacity-70 italic text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem] mb-6'>
          Search and book appointments with trusted doctors
        </p>

        {/* Search Bar */}
        <div className='bg-white flex py-1 justify-center items-center rounded-[6px] shadow-md shadow-gray-400 border-2 border-red-600'>
          <FiSearch className='w-10 text-xl text-gray-500' />
          <input
            type='text'
            placeholder='Search by name, degree, or specialty'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-[100%] p-1 outline-none border-l-1 border-gray-400'
          />
        </div>

        {/* Doctor Cards */}
        <div className='flex flex-col lg:flex-row gap-3'>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => {
              const isExpanded = expandedIds.includes(doctor.id);
              const shouldClamp = doctor.biography.length > 150;

              return (
                <div
                  key={doctor.id}
                  className='border-2 border-red-600 rounded-[6px] mt-3 p-4 bg-white shadow-md shadow-gray-600 cursor-pointer flex flex-col  items-start'
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
                    <p><strong>Medical School:</strong> {doctor.medicalschool}</p>
                    <p><strong>Certificates:</strong> {doctor.certificates}</p>
                    <p><strong>Charges:</strong> ₹{doctor.charges}</p>
                    <p><strong>Availability:</strong> {doctor.timeings}</p>
                  </div>

                  <p className='font-bold text-[1rem]'>Biography:</p>
                  <p className={`break-words ${!isExpanded && shouldClamp ? 'line-clamp-3' : ''}`}>
                    {doctor.biography}
                  </p>
                  {shouldClamp && (
                    <button
                      onClick={() => toggleExpand(doctor.id)}
                      className='text-blue-600 mt-1 hover:underline'
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                  <button
                    className='mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition'
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              );
            })
          ) : (
            <p>No doctors found matching your search.</p>
          )}
        </div>
      </div>

      {/* Appointment Modal */}
      <AnimatePresence>
        <AppointmentModal
          doctor={selectedDoctor}
          formData={appointmentForm}
          onClose={() => setSelectedDoctor(null)}
          onChange={handleFormChange}
          onSubmit={handleAppointmentSubmit}
        />
      </AnimatePresence>
    </div>
  );
};

export default BookAppointment;
