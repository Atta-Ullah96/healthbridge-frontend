import { useState, useEffect } from "react";
import { Video, Clock, Calendar, MapPin, CheckCircle, Activity } from "lucide-react";
import { useGetDoctorConfirmedAppointmentsQuery } from "../../api/appointmentApi";
import { Link } from "react-router-dom";

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function DoctorConfirmedAppointments() {
 
  const {data:appointments} = useGetDoctorConfirmedAppointmentsQuery()

  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const canJoin = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const diff = appointmentDateTime - currentTime;
    return diff <= 15 * 60 * 1000 && diff >= -60 * 60 * 1000;
  };

  const getTimeUntil = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const diff = appointmentDateTime - currentTime;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diff < 0) return "Started";
    if (days > 0) return `in ${days}d`;
    if (hours > 0) return `in ${hours}h`;
    if (minutes > 0) return `in ${minutes}m`;
    return "Now";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  let filteredAppointments = appointments;
  if (filter === "today") {
    const today = new Date().toISOString().slice(0, 10);
    filteredAppointments = appointments?.filter(a => a?.selectedDate === today);
  } else if (filter === "video") {
    filteredAppointments = appointments?.filter(a => a?.appointmentType === "online");
  }

  const todayCount = appointments?.filter(a => a.selectedDate === new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="text-emerald-600" size={24} />
                <h1 className="text-xl font-semibold text-gray-900">Confirmed appointments</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Activity size={14} />
                <span>Updated {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="text-lg font-semibold text-emerald-700">{appointments?.length}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="text-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-lg font-semibold text-blue-700">{todayCount}</div>
                <div className="text-xs text-gray-600">Today</div>
              </div>
              <div className="text-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="text-lg font-semibold text-indigo-700">{appointments?.filter(a => a.appointmentType === "online").length}</div>
                <div className="text-xs text-gray-600">Video</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("today")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === "today"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilter("video")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === "video"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Video calls
            </button>
          </div>
        </div>

        {/* Appointments */}
        {filteredAppointments?.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments?.map((a) => {
              const joinable = canJoin(a?.seletedDate, a?.slotId?.startTime);
              const timeUntil = getTimeUntil(a.seletedDate,a?.slotId?.startTime);

              return (
                <div key={a?._id} className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition">
                  <div className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Patient */}
                      <div className="flex items-center gap-3 flex-1">
                       <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm flex-shrink-0">
                        {a?.patientId?.name.slice(0,1)}
                      </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{a?.patientId?.name}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              a?.appointmentType === "online"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-orange-50 text-orange-700 border border-orange-200"
                            }`}>
                              {a?.appointmentType === "online" ? "Video" : "In-person"}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(a?.selectedDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {formatTime(a?.slotId?.startTime)}
                            </span>
                            <span className="text-gray-500">• {a?.slotId?.startTime +  a?.slotId?.endTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          timeUntil === "Now" || timeUntil === "Started"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {timeUntil}
                        </div>

                        {a?.appointmentType === "online" && (
                          a?.canJoinCall ? (
                            <button
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2"
                            >
                              <Video size={16} />
                              Join
                            </button>
                          ) : (
                            <Link to={`/video-call/${a?._id}`  } state={{ role: "doctor" }} className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed font-medium flex items-center gap-2">
                              <Video size={16} />
                              Join
                            </Link>
                          )
                        )}

                        {a?.appointmentType === "physical" && (
                          <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium flex items-center gap-2 border border-orange-200">
                            <MapPin size={16} />
                            Clinic
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorConfirmedAppointments;