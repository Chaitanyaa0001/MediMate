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
        symptoms: 'Cough & Sore throat',
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
        <h1 className="text-3xl font-bold text-blue-800 mb-6 animate-fade-in">
          Manage Appointments
        </h1>

        {!appointments || appointments.length === 0 ? (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md border border-yellow-300 animate-pulse">
            No appointment requests right now.
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white p-6 border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] animate-fade-in"
              >
                <div className="flex justify-between items-center flex-wrap gap-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900">{appt.patientName}</h2>
                    <p className="text-sm text-gray-500 italic">{appt.email}</p>
                    <p className="text-md text-gray-700">
                      <span className="font-semibold text-gray-800">📅 Date:</span> {appt.date}
                    </p>
                    <p className="text-md text-gray-700">
                      <span className="font-semibold text-gray-800">⏰ Time:</span> {appt.time}
                    </p>
                    <p className="text-md text-gray-700">
                      <span className="font-semibold text-gray-800">🩺 Symptoms:</span> {appt.symptoms}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {appt.status === 'pending' ? (
                      loadingId === appt.id ? (
                        <button
                          type="button"
                          disabled
                          className="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center justify-center cursor-not-allowed "
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
                            className=" flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition "
                          >
                            <HiCheck/>
                             Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appt.id, 'rejected')}
                            className=" flex items-center bg-red-500 text-white px-4.5 py-2 rounded-md hover:bg-red-600 transition"
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
