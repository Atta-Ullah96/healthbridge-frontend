import { useState } from 'react';
import { Calendar, Clock, Video,  Phone, User, Filter } from 'lucide-react';
import { useGetPatientAppointmentsQuery } from '../../api/appointmentApi';
import { Link } from 'react-router-dom';



function AppointmentCard({ appointment }) {
  const statusColors = {
    today: "bg-blue-100 text-blue-700 border-blue-300",
    confirmed: "bg-green-100 text-green-700 border-green-300",
    completed: "bg-gray-100 text-gray-600 border-gray-300"
  };

  const handleJoinCall = () => {
    alert(`Joining video call with ${appointment?.doctorId?.name}...`);
    // In real app: window.open(videoCallUrl, '_blank')
  };

 

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{appointment?.doctorId?.name}</h3>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[appointment?.status]}`}>
          {appointment?.status === 'today' ? 'Today' : appointment?.status?.charAt(0).toUpperCase() + appointment?.status?.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar size={16} className="text-gray-400" />
          <span>{new Date(appointment?.selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Clock size={16} className="text-gray-400" />
          <span>{appointment?.slotId?.startTime} </span>
        </div>
       
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600 font-medium">{appointment?.appointmentType}</span>
        {appointment?.appointmentType === 'online' && appointment?.status !== 'completed' && (
          <Link to={`/video-call/${appointment?._id}`  } state={{ role: "patient" }} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition flex items-center gap-2">
            
          
            <Video size={16} />
            {appointment?.canJoinCall  ? 'Join Now' : 'Join Call'}
          </Link>
        )}
        {!appointment?.appointmentType === 'online' && appointment?.status !== 'completed' && (
          <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition flex items-center gap-2">
            <Phone size={16} />
            Contact
          </button>
        )}
        {appointment?.status === 'completed' && (
          <span className="text-sm text-gray-500">Completed</span>
        )}
      </div>
    </div>
  );
}

function Appointment() {
  const [filter, setFilter] = useState('all');
 const {data} =  useGetPatientAppointmentsQuery()
 const appointmentData = data?.result
 
  const filteredAppointments = appointmentData?.filter(apt => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return apt.status === 'confirmed' || apt.status === 'today';
    if (filter === 'past') return apt.status === 'completed';
    return true;
  });

  const upcomingCount = appointmentData?.filter(apt => apt.status === 'confirmed' ).length;
  const pastCount = appointmentData?.filter(apt => apt.status === 'completed').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">View and manage your appointments</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({appointmentData?.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Past ({pastCount})
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments?.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No appointments found</h3>
            <p className="text-gray-500 text-sm">You don't have any {filter} appointments</p>
          </div>
        ) : (
          filteredAppointments?.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>

      {/* Quick Info */}
      {filter === 'upcoming' && upcomingCount > 0 && (
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Tip:</span> Join your video consultation 5 minutes early to test your connection
          </p>
        </div>
      )}
    </div>
  );
}

export default function AppointmentsPage() {
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Appointment />
      </div>
    </div>
  );
}