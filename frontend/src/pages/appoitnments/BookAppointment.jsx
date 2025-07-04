import React, { useState, useEffect } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FiSearch } from 'react-icons/fi';

// Dummy doctor data
const dummyDoctors = [
  {
    id: 1,
    firstname: 'Dr. Aryan',
    lastname: 'Sharma',
    medicaldegree: 'MBBS, MD',
    experienceyear: '10 years',
    charges: '500',
    timeings: '10:00 AM - 4:00 PM',
    biography: 'Expert in internal medicine and diabetes efek2 ygrg3 4ryg3cry 34y giy 34 r3iy4y yi3fiyrw y 3reifer fsah  sljvahev gu jqevrs ve g eyqr ye fl aeyhfg uoqerlhav fuoehjavf jgv aesuhj rwsulhjab ejv evuf eau ueeuersfgeir bfi e eirgf gewyg ygewlrg ewrlekjesg uewjrs guylewjl guyerj bfh ehr ue b  management.'
  },
  {
    id: 2,
    firstname: 'Dr. Priya',
    lastname: 'Verma',
    medicaldegree: 'BDS, MDS',
    experienceyear: '5 years',
    charges: '300',
    timeings: '11:00 AM - 3:00 PM',
    biography: 'Dental specialist with a wfwemlbf 3bre fqbfo wbsdjkfbqkewba lckaejbj ch erbf kewdb sfjhemrav jleh bierbf hekfn bkhear bfi;ejr bsbiekjrfs ekj br ejferkf bke jr ibrwkjef riskjfdvb ciseukjd; vsirkfjld eitkjw birehkwnf dbsifed bv iurkjtbfiu kj ebfi lkerhfa iuek passion for healthy smiles.'
  }
];

const BookAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    setDoctors(dummyDoctors);
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredDoctors = doctors.filter((doctor) =>
    (`${doctor.firstname} ${doctor.lastname} ${doctor.medicaldegree} ${doctor.biography}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DashNavbar />
      <div className='w-[85%] mx-auto my-8'>
        <h2 className='text-2xl text-red-600 sm:text-3xl lg:text-4xl '>Find Your Doctor</h2>
        <p className='opacity-70 italic text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem] mb-6'>Search and book appointments with trusted doctors</p>

        {/* Search Bar */}
        <div className='bg-white flex py-1 justify-center items-center rounded-[6px] shadow-md shadow-gray-400 border-2 border-red-600'>
          <FiSearch className='w-10 text-xl text-gray-500'/>
          <input
            type="text"
            placeholder="Search by name, degree, or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-[100%] p-1 outline-none border-l-1 border-gray-400 '
          />
        </div>

        {/* Doctor Cards */}
        <div className='flex flex-col gap-3'>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => {
              const isExpanded = expandedIds.includes(doctor.id);
              const shouldClamp = doctor.biography.length > 150; // Set clamp threshold
              return (
                <div key={doctor.id} className='border-2 border-red-600 rounded-[6px] mt-3 p-4 bg-white shadow-md shadow-gray-600 cursor-pointer flex flex-col items-start '>
                  <h3 className='text-xl font-semibold text-red-700  sm:text-2xl lg:text-3xl'>
                    {doctor.firstname} {doctor.lastname}
                  </h3>

                  <p className='opacity-80 italic mb-2  '>{doctor.medicaldegree}</p>
                  <p className='font-bold italic'>Experience: <span className='font-medium opacity-70'>{doctor.experienceyear} </span> </p>
                  <p className='font-bold italic'>Charges: <span className='font-medium opacity-70'>₹{doctor.charges}</span></p>
                  <p className='font-bold italic'>Available: <span className='font-medium opacity-70'>{doctor.timeings}</span></p>
                  <p className='font-bold text-[1rem]'>Biblography:</p>
                  <p className={` break-words ${!isExpanded && shouldClamp ? 'line-clamp-3' : ''}`}>
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
                  <button className='mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition'>Book Appointment</button>

                </div>
                
              );
            })
          ) : (
            <p>No doctors found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
