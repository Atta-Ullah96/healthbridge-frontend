import { useEffect, useState } from "react";
import { Calendar, Clock, Save, CheckCircle } from "lucide-react";
import { useGetAvailabilityQuery, useSaveAvailabilityMutation } from "../../api/doctorApi";


const daysList = [
  { name: "Monday", short: "Mon" },
  { name: "Tuesday", short: "Tue" },
  { name: "Wednesday", short: "Wed" },
  { name: "Thursday", short: "Thu" },
  { name: "Friday", short: "Fri" },
  { name: "Saturday", short: "Sat" },
  { name: "Sunday", short: "Sun" },
];

// 🔁 Backend → UI
const mapFromBackend = (backendDays = []) =>
  daysList.map((day) => {
    const backendDay = backendDays.find(
      (d) => d.day === day.name
    );

    return {
      day: day.name,
      short: day.short,
      selected: backendDay?.isAvailable || false,
      startTime: backendDay?.timeSlots?.[0]?.startTime || "",
      endTime: backendDay?.timeSlots?.[0]?.endTime || "",
    };
  });


// 🔁 UI → Backend
const mapToBackend = (availability) => ({
  days: availability.map((item) => ({
    day: item.day,
    isAvailable: item.selected,
    timeSlots: item.selected
      ? [{ startTime: item.startTime, endTime: item.endTime }]
      : [],
  })),
});


export default function AvailabilityForm() {
  const [availability, setAvailability] = useState(
    daysList.map((day) => ({
      day: day.name,
      short: day.short,
      selected: false,
      startTime: "",
      endTime: "",
    }))
  );

  const [saved, setSaved] = useState(false);

  const { data } = useGetAvailabilityQuery();
  const [saveAvailability, { isLoading }] = useSaveAvailabilityMutation();

  // Load existing availability
  useEffect(() => {
    if (data?.data?.days) {
      setAvailability(mapFromBackend(data.data.days));
    }
  }, [data]);

  const handleCheckbox = (index) => {
    const updated = [...availability];
    updated[index].selected = !updated[index].selected;

    if (!updated[index].selected) {
      updated[index].startTime = "";
      updated[index].endTime = "";
    }

    setAvailability(updated);
    setSaved(false);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
    setSaved(false);
  };

  const handleSave = async () => {
    const hasValidDay = availability.some(
      (d) => d.selected && d.startTime && d.endTime
    );

    if (!hasValidDay) {
      alert("Select at least one day with time");
      return;
    }

    try {
      await saveAvailability(mapToBackend(availability)).unwrap();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err?.data?.message || "Failed to save availability");
    }
  };

  const selectedCount = availability.filter((a) => a.selected).length;
  const completeCount = availability.filter(
    (a) => a.selected && a.startTime && a.endTime
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" />
            <h1 className="text-xl font-semibold">Availability Schedule</h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Set your weekly working hours
          </p>
        </div>

        {/* Success */}
        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4 flex gap-2">
            <CheckCircle className="text-emerald-600" />
            <span className="text-sm font-medium">
              Availability saved successfully
            </span>
          </div>
        )}

        {/* Days */}
        <div className="space-y-3">
          {availability.map((item, index) => (
            <div
              key={item.day}
              className={`bg-white rounded-lg border p-4 ${
                item.selected ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex items-center gap-3 w-48">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleCheckbox(index)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="font-medium">{item.day}</span>
                </div>

                {item.selected && (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={item.startTime}
                      onChange={(e) =>
                        handleTimeChange(index, "startTime", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      type="time"
                      value={item.endTime}
                      onChange={(e) =>
                        handleTimeChange(index, "endTime", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 bg-white border rounded-lg p-4">
          <button
            disabled={completeCount === 0 || isLoading}
            onClick={handleSave}
            className={`w-full py-2.5 rounded-lg font-medium flex justify-center gap-2 ${
              completeCount === 0
                ? "bg-gray-100 text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Save size={18} />
            {isLoading ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
}
