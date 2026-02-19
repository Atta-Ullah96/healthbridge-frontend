import { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Video,
  MapPin,
  CheckCircle,
  Activity
} from "lucide-react";

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function mockAppointments() {
  const today = new Date().toISOString().slice(0, 10);
  return [
    { id: "a1", patientName: "Ali Raza", date: today, time: "09:30", type: "Online", status: "confirmed", fee: 2000 },
    { id: "a2", patientName: "Sara Malik", date: today, time: "11:00", type: "In-person", status: "pending", fee: 2500 },
    { id: "a3", patientName: "Hassan Khan", date: addDays(1), time: "14:00", type: "Online", status: "pending", fee: 2000 },
    { id: "a4", patientName: "Fatima Ali", date: today, time: "15:30", type: "In-person", status: "confirmed", fee: 2500 },
    { id: "a5", patientName: "Ahmed Shah", date: today, time: "16:00", type: "Online", status: "confirmed", fee: 2000 },
  ];
}

function mockPatients() {
  return [
    { id: "p1", name: "Ali Raza", lastVisit: "2025-06-15", notes: "Asthma follow-up", visits: 5 },
    { id: "p2", name: "Sara Malik", lastVisit: "2025-07-20", notes: "Vaccination", visits: 2 },
    { id: "p3", name: "Hassan Khan", lastVisit: "2025-08-10", notes: "Regular checkup", visits: 8 },
    { id: "p4", name: "Fatima Ali", lastVisit: "2025-09-05", notes: "Blood pressure", visits: 12 },
  ];
}

function mockEarnings() {
  return {
    last30: [
      { date: "2025-01-01", amount: 15000 },
      { date: "2025-01-02", amount: 8000 },
      { date: "2025-01-03", amount: 12000 },
    ],
    thisMonth: 45000,
    lastMonth: 38000,
    growth: 18.4
  };
}

function DoctorDashboard() {
  const [patients] = useState(mockPatients());
  const [messages] = useState([
    { id: 1, unread: 2, from: "Ali Raza", lastMsg: "When is my next appointment?" },
    { id: 2, unread: 5, from: "Sara Malik", lastMsg: "Need prescription refill" },
    { id: 3, unread: 0, from: "Hassan Khan", lastMsg: "Thank you doctor" },
  ]);
  const [earnings] = useState(mockEarnings());
  const [appointments] = useState(mockAppointments());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todaysAppts = appointments.filter((a) => a.date === today);
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const unreadCount = messages.reduce((acc, c) => acc + (c.unread || 0), 0);
  const todaysEarnings = todaysAppts
    .filter(a => a.status === "confirmed")
    .reduce((sum, a) => sum + a.fee, 0);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {getGreeting()}, Dr. Khan
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Activity size={14} />
            <span>Updated {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="text-blue-600" size={20} />
              <span className="text-2xl font-semibold text-gray-900">{todaysAppts.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">Today's appointments</p>
            <p className="text-xs text-gray-500 mt-1">{todaysAppts.filter(a => a.status === "confirmed").length} confirmed</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Clock className="text-amber-600" size={20} />
              <span className="text-2xl font-semibold text-gray-900">{pendingCount}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">Pending requests</p>
            <p className="text-xs text-gray-500 mt-1">Need attention</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <MessageSquare className="text-indigo-600" size={20} />
              <span className="text-2xl font-semibold text-gray-900">{unreadCount}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">Unread messages</p>
            <p className="text-xs text-gray-500 mt-1">{messages.filter(m => m.unread > 0).length} conversations</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Users className="text-emerald-600" size={20} />
              <span className="text-2xl font-semibold text-gray-900">{patients.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">Active patients</p>
            <p className="text-xs text-gray-500 mt-1">In your care</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Today's schedule</h2>
              <p className="text-sm text-gray-500 mt-0.5">{todaysAppts.length} appointments</p>
            </div>

            <div className="p-5">
              {todaysAppts.length > 0 ? (
                <div className="space-y-3">
                  {todaysAppts.map((a) => (
                    <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm flex-shrink-0">
                        {a.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{a.patientName}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                              <span>{formatTime(a.time)}</span>
                              <span>•</span>
                              {a.type === "Online" ? (
                                <span className="flex items-center gap-1">
                                  <Video size={12} /> Video call
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} /> In-person
                                </span>
                              )}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            a.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            {a.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No appointments today</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Earnings */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Earnings</h2>
                <p className="text-sm text-gray-500 mt-0.5">Last 30 days</p>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    Rs. {earnings.thisMonth.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-sm">
                    <TrendingUp className="text-emerald-600" size={14} />
                    <span className="text-emerald-600 font-medium">+{earnings.growth}%</span>
                    <span className="text-gray-500">from last month</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Today's potential</span>
                    <span className="font-medium text-gray-900">Rs. {todaysEarnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Messages</h2>
                <p className="text-sm text-gray-500 mt-0.5">{unreadCount} unread</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {messages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-sm flex-shrink-0">
                        {msg.from.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 text-sm">{msg.from}</p>
                          {msg.unread > 0 && (
                            <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                              {msg.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate mt-0.5">{msg.lastMsg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick info */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Overview</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total consultations</span>
                  <span className="font-medium text-gray-900">
                    {patients.reduce((sum, p) => sum + p.visits, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion rate</span>
                  <span className="font-medium text-gray-900">96%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average rating</span>
                  <span className="font-medium text-gray-900">4.8 ⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;