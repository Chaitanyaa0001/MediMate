import React, { useState, useEffect } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FiSearch } from 'react-icons/fi';

// Dummy doctor data (replace later with API data)
const dummyDoctors = [
  {
    id: 1,
    firstname: 'Dr. Aryan',
    lastname: 'Sharma',
    medicaldegree: 'MBBS, MD',
    experienceyear: '10',
    charges: '500',
    timeings: '10:00 AM - 4:00 PM',
    biography: 'Expert in internal medicine and diabetes management.'
  },
  {
    id: 2,
    firstname: 'Dr. Priya',
    lastname: 'Verma',
    medicaldegree: 'BDS, MDS',
    experienceyear: '5',
    charges: '300',
    timeings: '11:00 AM - 3:00 PM',
    biography: 'Dental specialist with a passion for healthy smiles.'
  }
];

const BookAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Simulate fetch from backend
    setDoctors(dummyDoctors);
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    (`${doctor.firstname} ${doctor.lastname} ${doctor.medicaldegree} ${doctor.biography}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DashNavbar />
      <div>
        <h2>Find Your Doctor</h2>
        <p>Search and book appointments with trusted doctors</p>

        {/* Search Bar */}
        <div>
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name, degree, or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Doctor Cards */}
        <div>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id}>
                <h3>
                  {doctor.firstname} {doctor.lastname}
                </h3>
                <p>{doctor.medicaldegree}</p>
                <p>Experience: {doctor.experienceyear} years</p>
                <p>Charges: ₹{doctor.charges}</p>
                <p>Available: {doctor.timeings}</p>
                <p>{doctor.biography}</p>
                <button>Book Appointment</button>
              </div>
            ))
          ) : (
            <p>No doctors found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
