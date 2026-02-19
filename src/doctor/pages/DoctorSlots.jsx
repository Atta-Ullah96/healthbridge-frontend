import React, { useState, useEffect } from "react";


const DoctorSlots = () => {
  const [slots, setSlots] = useState([
    {
      _id: "1",
      startTime: "2025-10-23T09:00",
      endTime: "2025-10-23T09:30",
      isBooked: false,
    },
    {
      _id: "2",
      startTime: "2025-10-23T10:00",
      endTime: "2025-10-23T10:30",
      isBooked: true,
    },
    {
      _id: "3",
      startTime: "2025-10-23T11:00",
      endTime: "2025-10-23T11:30",
      isBooked: false,
    },
  ]);
  const [form, setForm] = useState({ startTime: "", endTime: "" });
  const [loading, setLoading] = useState(false);
  

  // Fetch all slots for this doctor
  const fetchSlots = async () => {
    console.log("hello")
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // Handle create new slot
  const handleCreateSlot = async (e) => {
    e.preventDefault();
    if (!form.startTime || !form.endTime) return alert("Please select start and end time");
    setLoading(true);

    console.log("handling")
  };

  // Handle delete slot
  const handleDelete = async (id) => {
    console.log("deleting the slot");
    
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Manage Slots</h1>

      {/* Create Slot Form */}
      <form
        onSubmit={handleCreateSlot}
        className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center gap-4"
      >
        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-gray-600 text-sm mb-1">Start Time</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-gray-600 text-sm mb-1">End Time</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all mt-3 md:mt-7"
        >
          {loading ? "Creating..." : "Create Slot"}
        </button>
      </form>

      {/* Slots List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Slots</h2>

        {slots.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No slots created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Start Time</th>
                  <th className="p-3 border-b">End Time</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, index) => (
                  <tr key={slot._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{new Date(slot.startTime).toLocaleString()}</td>
                    <td className="p-3">{new Date(slot.endTime).toLocaleString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          slot.isBooked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {slot.isBooked ? "Booked" : "Available"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(slot._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSlots;
