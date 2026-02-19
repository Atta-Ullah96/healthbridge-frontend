import { useState } from "react";
import { Calendar, Clock, Video, User, CheckCircle, XCircle, Eye, Filter, Search, MapPin } from "lucide-react";
import { useAcceptAppointmentMutation, useGetDoctorAppointmentsQuery } from "../../api/appointmentApi";

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}



function DoctorAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
   const { data, isLoading } = useGetDoctorAppointmentsQuery();
   const appointments = data?.appointments
  
   const [acceptAppointment ] = useAcceptAppointmentMutation()

  const handleAcceptAppointment = async(id) => {
    const response = await acceptAppointment(id)
    console.log(response);
    
  };




 


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-blue-600" size={24} />
                <h1 className="text-xl font-semibold text-gray-900">Appointments</h1>
              </div>
              <p className="text-sm text-gray-600">{appointments?.length} today</p>
            </div>

            {/* Stats */}
          
          </div>

          {/* Search and Filter */}
         
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {appointments?.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No appointments found</p>
            </div>
          ) : (
            appointments?.map((appointment) => (
              <div
                key={appointment?.id}
                className="cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition"
              >
                <div className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Patient info */}
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm flex-shrink-0">
                        {appointment?.patientId?.name.slice(0,1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium text-gray-900">{appointment?.patientId?.name}</h3>
                          
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(appointment?.selectedDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {appointment?.slotId?.startTime}
                          </span>
                          {appointment?.appointmentType === "online" ? (
                            <span className="flex items-center gap-1">
                              <Video size={14} className="text-green-600" />
                              Online
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <MapPin size={14} className="text-orange-600" />
                              In-person
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      {appointment?.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAcceptAppointment(appointment?._id)}
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium flex items-center gap-1 cursor-pointer "
                          >
                            <CheckCircle size={14} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(appointment?.id, "cancelled")}
                            className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center gap-1 cursor-pointer "
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </>
                      )}
                      {appointment?.status === "confirmed" && (
                        <button
                          onClick={() => handleAction(appointment?.id, "completed")}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-1 cursor-pointer "
                        >
                          <CheckCircle size={14} />
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-1 cursor-pointer "
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAppointment(null)}>
            <div className="bg-white rounded-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Details</h2>
                <button onClick={() => setSelectedAppointment(null)} className="cursor-pointer text-gray-400 hover:text-gray-600">
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                    {selectedAppointment?.patientId?.name.slice(0,1)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedAppointment.patientId?.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 border $`}>
                      {selectedAppointment?.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <Calendar className="text-blue-600" size={16} />
                    <span className="text-sm text-gray-900">{formatDate(selectedAppointment?.selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <Clock className="text-blue-600" size={16} />
                    <span className="text-sm text-gray-900">{selectedAppointment?.slotId?.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    {selectedAppointment?.appointmentType === "online" ? <Video className="text-green-600" size={16} /> : <MapPin className="text-orange-600" size={16} />}
                    <span className="text-sm text-gray-900">{selectedAppointment?.appointmentType}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <User className="text-gray-600" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointments;