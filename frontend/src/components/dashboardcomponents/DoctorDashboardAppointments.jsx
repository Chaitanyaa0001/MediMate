import React from 'react';
import { useManageAppointments } from '../../hooks/bookings/usemanagebookings';
import { HiClock, HiCheck, HiX } from 'react-icons/hi';

const DoctorDashboardAppointments = () => {
  const { appointmentsdata } = useManageAppointments();
  const recentAppointments = appointmentsdata.slice(0, 3); // show top 3

  return (
    <div className="w-[90%] mx-auto my-4 lg:w-[85%]">
      <h2 className="text-xl font-bold text-red-600 mb-4 sm:text-2xl lg:text-4xl">🩺 Recent Appointments</h2>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-red-600 h-[100%]">
        {recentAppointments.length === 0 ? (
          <p className="text-sm text-gray-600 italic">No new appointments yet.</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
            {recentAppointments.map((appt) => (
              <div
                key={appt._id}
                className="border border-gray-300 rounded-lg p-3 shadow-md shadow-gray-500 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-800 text-xl">{appt.patientname}</h3>
                  <span className="text-xs text-gray-500">{appt.date} @ {appt.time}</span>
                </div>
                <p className="text-sm text-gray-600">{appt.email}</p>
                <p className="text-sm text-gray-700 mt-1 italic">Symptoms: {appt.symptoms}</p>
                <div className="mt-2">
                  {appt.status === 'pending' && (
                    <span className="flex items-center text-yellow-600 text-sm">
                      <HiClock className="mr-1" /> Pending
                    </span>
                  )}
                  {appt.status === 'accepted' && (
                    <span className="flex items-center text-green-600 text-sm">
                      <HiCheck className="mr-1" /> Accepted
                    </span>
                  )}
                  {appt.status === 'rejected' && (
                    <span className="flex items-center text-red-600 text-sm">
                      <HiX className="mr-1" /> Rejected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboardAppointments;
