import { useState } from "react";
import { Search, User, Calendar, FileText, Eye, Phone, Mail } from "lucide-react";

function mockPatients() {
  return [
    { 
      id: "p1", 
      name: "Ali Raza", 
      lastVisit: "2025-06-15", 
      notes: "Asthma follow-up",
      age: 34,
      phone: "+92 300 1234567",
      email: "ali.raza@email.com",
      visits: 5
    },
    { 
      id: "p2", 
      name: "Sara Malik", 
      lastVisit: "2025-07-20", 
      notes: "Vaccination",
      age: 28,
      phone: "+92 301 7654321",
      email: "sara.malik@email.com",
      visits: 2
    },
    { 
      id: "p3", 
      name: "Hassan Khan", 
      lastVisit: "2025-08-10", 
      notes: "Regular checkup",
      age: 45,
      phone: "+92 333 9876543",
      email: "hassan@email.com",
      visits: 8
    },
    { 
      id: "p4", 
      name: "Fatima Ali", 
      lastVisit: "2025-09-05", 
      notes: "Blood pressure monitoring",
      age: 52,
      phone: "+92 321 5551234",
      email: "fatima.ali@email.com",
      visits: 12
    },
    { 
      id: "p5", 
      name: "Ahmed Shah", 
      lastVisit: "2025-10-15", 
      notes: "Diabetes management",
      age: 39,
      phone: "+92 345 7778899",
      email: "ahmed.shah@email.com",
      visits: 6
    },
    { 
      id: "p6", 
      name: "Zainab Hussain", 
      lastVisit: "2025-11-22", 
      notes: "Routine consultation",
      age: 31,
      phone: "+92 312 4445566",
      email: "zainab@email.com",
      visits: 3
    },
  ];
}

function DoctorPatient() {
  const [query, setQuery] = useState("");
  const [patients] = useState(mockPatients());
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const list = patients.filter((p) => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toLowerCase().includes(query.toLowerCase())
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 mb-1">Patients</h1>
              <p className="text-sm text-gray-600">{patients.length} total patients</p>
            </div>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search by name or ID" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Patients grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.length > 0 ? (
            list.map((p) => (
              <div key={p.id} className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{p.name}</h3>
                        <p className="text-xs text-gray-500">{p.age} years</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {p.visits} visits
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} className="text-blue-600" />
                      <span>Last visit: {formatDate(p.lastVisit)}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <FileText size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{p.notes || "No notes"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPatient(p)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg border border-gray-200 p-12 text-center">
              <User className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-500">No patients found</p>
            </div>
          )}
        </div>

        {/* Patient details modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelectedPatient(null)}>
            <div className="bg-white rounded-lg max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Patient details</h2>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-xl">
                    {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-sm text-gray-600">Patient ID: {selectedPatient.id}</p>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Age</p>
                    <p className="font-medium text-gray-900">{selectedPatient.age} years</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total visits</p>
                    <p className="font-medium text-gray-900">{selectedPatient.visits}</p>
                  </div>
                  <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Last visit</p>
                    <p className="font-medium text-gray-900">{formatDate(selectedPatient.lastVisit)}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-blue-600" />
                    <span className="text-gray-700">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-blue-600" />
                    <span className="text-gray-700">{selectedPatient.email}</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-2">
                  <p className="text-xs text-gray-600 mb-2">Recent notes</p>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedPatient.notes}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Schedule appointment
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPatient;