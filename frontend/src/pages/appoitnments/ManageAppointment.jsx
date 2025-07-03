import React, { useEffect, useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { HiCheck, HiX } from 'react-icons/hi'; 

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    setAppointments([
      {
        id: 1,
        patientName: 'Chaitanya Sharma',
        email: 'chai.sharma@email.com',
        date: '2025-07-05',
        time: '10:30 AM',
        symptoms: 'Fever, Headache',
        status: 'pending',
      },
      {
        id: 2,
        patientName: 'Riya Verma',
        email: 'riya@email.com',
        date: '2025-07-06',
        time: '2:00 PM',
        symptoms: 'Cough , Sore throat',
        status: 'pending',
      },
    ]);
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setLoadingId(id);
    setTimeout(() => {
      const updatedAppointments = appointments.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      );
      setAppointments(updatedAppointments);
      setLoadingId(null);
    }, 1000); // simulate delay
  };

  return (
    <div>
      <DashNavbar />
      <div className="p-6 lg:w-[85%] mx-auto min-h-[90vh]">
        <h1 className="text-3xl lg:text-4xl font-bold text-red-600 mb-6 animate-fade-in">
          Manage Appointments
        </h1>

        {!appointments || appointments.length === 0 ? (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md border border-yellow-300 animate-pulse">
            No appointment requests right now.
          </div>
        ) : (
          <div className="flex flex-col gap-5 py-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="bg-white p-6 border-2 border-red-500 rounded-[6px] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] animate-fade-in">
                <div className="flex justify-between items-start flex-col lg:flex-row  lg:items-center ">
                  <div className=" mb-3">
                    <h2 className="text-2xl font-semibold text-gray-900 italic ">{appt.patientName}</h2>
                    <p className="text-[0.8rem]  mb-2 italic lg:text-[0.9rem]">{appt.email}</p>

                    <div>
                      <div className='flex  justify-between  lg:flex-col lg:gap-3  gap-20 mb-2 '>
                        <p className="text-[1rem] font-semibold ">Date:<span className='opacity-70 font-medium  '>{appt.date}</span></p>
                        <p className="text-[1rem]  font-semibold ">Time: <span className='opacity-70 font-medium  '>{appt.time}</span></p>
                      </div>
                      
                     <div className="flex flex-wrap gap-1 mt-4    ">
                     {appt.symptoms.split(',').map((symptom, i) => (
                       <span key={i} className="border-1 border-red-500 rounded-[6px]  text-red-700 px-1   bg-red-200">{symptom.trim()}</span>
                     ))}
                    </div>

                    </div> 
                  </div>

                  <div className="flex flex-row gap-2 mt-1">
                    {appt.status === 'pending' ? (
                      loadingId === appt.id ? (
                        <button
                          type="button"
                          disabled
                          className="bg-red-400 text-white px-4 py-2 rounded-md flex items-center justify-center cursor-not-allowed "
                        >
                          <svg
                            className="mr-2 h-5 w-5 animate-spin text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                          </svg>
                          Processing…
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(appt.id, 'accepted')}
                            className=" flex items-center cursor-pointer bg-green-500 text-white  px-2 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-green-600 transition "
                          >
                            <HiCheck/>
                             Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appt.id, 'rejected')}
                            className=" flex items-center cursor-pointer bg-red-500 text-white  px-2 py-1 lg:px-4.5 lg:py-2 rounded-md hover:bg-red-600 transition"
                          >
                            <HiX/>
                             Reject
                          </button>
                        </>
                      )
                    ) : (
                      <span
                        className={`text-sm font-semibold px-4 py-2 rounded-md ${
                          appt.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointment;
