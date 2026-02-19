import { useEffect, useState } from "react";
import { Edit2, Calendar, Clock, Coffee, ChevronDown, ChevronUp, X } from "lucide-react";
import { useGetAvailabilityQuery, useSaveAvailabilityMutation } from "../../api/doctorApi";


const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const TIME_SLOTS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00", "21:00", "22:00"
];

/* ---------------- MODAL ---------------- */
const EditModal = ({ title, onClose, onSave, children }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-3xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose}><X /></button>
      </div>

      {children}

      <div className="flex gap-3 mt-6 border-t pt-4">
        <button
          onClick={onClose}
          className="flex-1 border rounded-lg py-2"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex-1 bg-blue-600 text-white rounded-lg py-2"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

/* ---------------- DAY EDITOR ---------------- */
const DayEditor = ({ day, value, onChange }) => {
  const [open, setOpen] = useState(value?.isAvailable);

  const toggleDay = () => {
    onChange({ ...value, isAvailable: !value?.isAvailable });
    setOpen(!value?.isAvailable);
  };

  const updateArray = (key, index, field, val) => {
    const updated = [...value[key]];
    updated[index][field] = val;
    onChange({ ...value, [key]: updated });
  };

  const addItem = (key) => {
    onChange({
      ...value,
      [key]: Array.isArray(value?.[key])
        ? [...value[key], { start: "09:00", end: "17:00" }]
        : [{ start: "09:00", end: "17:00" }],
    });
  };


  const removeItem = (key, index) =>
    onChange({ ...value, [key]: value[key].filter((_, i) => i !== index) });

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={toggleDay}
        className={`w-full px-4 py-3 flex justify-between items-center ${value?.isAvailable ? "bg-blue-50" : "bg-white"
          }`}
      >
        <span className="font-medium">{day}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {value?.isAvailable && open && (
        <div className="p-4 bg-gray-50 space-y-4">
          {/* Working Hours */}
          <Section
            title="Working Hours"
            icon={<Clock size={16} />}
            items={value?.timeSlots}
            onAdd={() => addItem("timeSlots")}
            onRemove={(i) => removeItem("timeSlots", i)}
            onChange={(i, f, v) => updateArray("timeSlots", i, f, v)}
          />

          {/* Breaks */}
          <Section
            title="Breaks"
            icon={<Coffee size={16} />}
            items={value?.breaks}
            onAdd={() => addItem("breaks")}
            onRemove={(i) => removeItem("breaks", i)}
            onChange={(i, f, v) => updateArray("breaks", i, f, v)}
          />
        </div>
      )}
    </div>
  );
};

/* ---------------- SECTION ---------------- */
const Section = ({ title, icon, items, onAdd, onRemove, onChange }) => (
  <div>
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon} {title}
      </div>
      <button onClick={onAdd} className="text-blue-600 text-xs">+ Add</button>
    </div>

    {items?.length === 0 && (
      <p className="text-xs text-gray-400 italic">None</p>
    )}

    {items?.map((item, i) => (
      <div key={i} className="flex items-center gap-2 mb-2">
        <select
          value={item.start}
          onChange={(e) => onChange(i, "start", e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        >
          {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
        </select>

        <span>to</span>

        <select
          value={item.end}
          onChange={(e) => onChange(i, "end", e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        >
          {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
        </select>

        <button onClick={() => onRemove(i)} className="text-red-500">
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
export default function AvailabilitySettings() {
  const [saveAvailability] = useSaveAvailabilityMutation();
  const { data, isLoading } = useGetAvailabilityQuery();

  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({});

  useEffect(() => {
    if (!data?.data) return;

    const map = {};

    DAYS_OF_WEEK.forEach((day) => {
      const found = data?.data?.days?.find(d => d.day === day);

      map[day] = found
        ? {
          isAvailable: found.isAvailable,
          timeSlots: found.timeSlots || [],
          breaks: found.breaks || [],
        }
        : {
          isAvailable: false,
          timeSlots: [],
          breaks: [],
        };
    });

    setState(map);
  }, [data]);

 
  const handleSave = async () => {
    const payload = {
      days: DAYS_OF_WEEK.map(day => ({
        day,
        ...state[day],
      })),
    };
    await saveAvailability(payload);
    setEditing(false);
  };

  return (
    <>
      
      <div className="bg-white p-6 rounded-xl ">

        <div className="flex justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Calendar size={18} /> Availability
          </h2>
          <button
            onClick={() => setEditing(true)}
            className="cursor-pointer text-blue-600 text-sm flex items-center gap-1"
          >
            <Edit2 size={14} /> Edit
          </button>
        </div>
        {data?.data?.days?.map((day) => (
          <div key={day.day} className="mb-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{day.day}</p>
              <p className="text-sm text-gray-500">
                {day.isAvailable ? "Available" : "Off"}
              </p>
            </div>

            {day.isAvailable && (
              <>
                {/* Time slots */}
                <div className="text-sm text-gray-700 mt-1">
                  {day.timeSlots.map((slot, i) => (
                    <span key={i} className="mr-2">
                      {slot.start} – {slot.end}
                    </span>
                  ))}
                </div>

                {/* Breaks */}
                {day.breaks?.length > 0 && (
                  <div className="text-xs text-red-500 mt-1">
                    Breaks:{" "}
                    {day.breaks.map((b, i) => (
                      <span key={i}>
                        {b.start}-{b.end}
                        {i < day.breaks.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {editing && (
          <EditModal
            title="Edit Availability"
            onClose={() => setEditing(false)}
            onSave={handleSave}
          >
            <div className="space-y-3">
              {DAYS_OF_WEEK.map(day => (
                <DayEditor
                  key={day}
                  day={day}
                  value={state[day]}
                  onChange={(v) => setState({ ...state, [day]: v })}
                />
              ))}
            </div>
          </EditModal>
        )}
      </div>
    </>
  );
}



function AvailabilitySection(props) {

  const { data, isLoading } = props
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Availability</h2>

      {data?.data?.days.map((day) => (
        <div key={day.day} className="mb-3">
          <p className="font-semibold">{day.day}</p>

          {day.isAvailable ? (
            <div className="text-sm text-gray-700">
              {day.timeSlots.map((slot, i) => (
                <span key={i} className="mr-2">
                  {slot.start} – {slot.end}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Not Available</p>
          )}
        </div>
      ))}
    </div>
  );
}
