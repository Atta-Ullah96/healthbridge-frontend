import { Calendar, Clock, FileText, Activity, Plus, ChevronRight } from 'lucide-react';
import { useGetCurrentPatientQuery } from '../../api/patientApi';

// Sample data
const patientData = {
  name: "Sarah Johnson",
  upcomingAppointments: [
    {
      id: 1,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "Jan 12, 2026",
      time: "10:30 AM",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Emily Roberts",
      specialty: "General Physician",
      date: "Jan 18, 2026",
      time: "2:00 PM",
      type: "Checkup"
    }
  ],
  recentPrescriptions: [
    {
      id: 1,
      medicine: "Lisinopril 10mg",
      doctor: "Dr. Michael Chen",
      date: "Dec 28, 2025",
      duration: "30 days"
    },
    {
      id: 2,
      medicine: "Vitamin D3",
      doctor: "Dr. Emily Roberts",
      date: "Dec 20, 2025",
      duration: "60 days"
    }
  ],
  healthStats: [
    { label: "Total Appointments", value: "24", color: "blue" },
    { label: "Active Prescriptions", value: "3", color: "green" },
    { label: "Lab Reports", value: "8", color: "purple" }
  ]
};

function OverviewComponent() {
  const { name, upcomingAppointments, recentPrescriptions, healthStats } = patientData;
 const { data: currentPatient, isLoading } = useGetCurrentPatientQuery();
  const patient = currentPatient?.patient;
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {patient?.name}! 👋</h1>
        <p className="text-blue-100">Here's your health overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
            <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={22} className="text-blue-600" />
              Upcoming Appointments
            </h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{apt.doctor}</h3>
                    <p className="text-sm text-gray-500">{apt.specialty}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {apt.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {apt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {apt.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full bg-blue-50 text-blue-700 font-medium py-3 rounded-xl hover:bg-blue-100 transition flex items-center justify-center gap-2">
            <Plus size={18} />
            Book New Appointment
          </button>
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText size={22} className="text-green-600" />
              Recent Prescriptions
            </h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {recentPrescriptions.map((rx) => (
              <div key={rx.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{rx.medicine}</h3>
                    <p className="text-sm text-gray-500">by {rx.doctor}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {rx.duration}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Prescribed on {rx.date}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full bg-green-50 text-green-700 font-medium py-3 rounded-xl hover:bg-green-100 transition flex items-center justify-center gap-2">
            <FileText size={18} />
            View All Prescriptions
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition text-center group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Book Appointment</div>
          </button>

          <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition text-center group">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 transition">
              <FileText size={20} className="text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">View Records</div>
          </button>

          <button className="p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition text-center group">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition">
              <Activity size={20} className="text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Health Tracker</div>
          </button>

          <button className="p-4 border border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition text-center group">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-orange-200 transition">
              <Plus size={20} className="text-orange-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Upload Report</div>
          </button>
        </div>
      </div>

      {/* Health Reminder */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-gray-800 mb-2">💡 Health Reminder</h3>
        <p className="text-gray-700 text-sm">
          Don't forget to take your evening medication at 8:00 PM. Stay hydrated and take a short walk today!
        </p>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <OverviewComponent />
      </div>
    </div>
  );
}