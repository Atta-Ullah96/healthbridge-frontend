import { useState, useEffect } from "react";
import { Edit2, Video } from "lucide-react";
import { EditModal } from "../pages/ProfilePage";

import { toast } from "react-toastify";
import { useGetConsultationSetupQuery, useUpsertConsultationSetupMutation } from "../../api/doctorApi";

const ALL_MODES  = ["video" , "physical"]
function ConsultationSetup() {
  const { data, isLoading } = useGetConsultationSetupQuery();
  
  const [upsertConsultation] = useUpsertConsultationSetupMutation();

  const [editing, setEditing] = useState(false);
  const [consultationData, setConsultationData] = useState({
    title: "",
    description: "",
    fee: 0,
    duration: 30,
    modes: [], // array: ["online", "physical"]
  });
  const [formData, setFormData] = useState(consultationData);

  // Load data from backend
  useEffect(() => {
    if (data) {
      setConsultationData(data);
    }
  }, [data]);

  const openModal = () => {
    setFormData({ ...consultationData });
    setEditing(true);
  };

  const closeModal = () => setEditing(false);

   const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleModeToggle = (mode) => {
  setFormData((prev) => {
    const modes = Array.isArray(prev.modes) ? prev.modes : [];

    return {
      ...prev,
      modes: modes.includes(mode)
        ? modes.filter((m) => m !== mode)
        : [...modes, mode],
    };
  });
};


  const saveChanges = async () => {
    try {
      const updated = await upsertConsultation(formData).unwrap();
      setConsultationData(updated);
      toast.success("Consultation setup saved successfully!");
     
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save consultation setup");
    }
  };

  if (isLoading) return <p>Loading consultation setup...</p>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Video size={22} className="text-blue-600" /> Consultation Setup
        </h2>
        <button
          onClick={openModal}
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          <Edit2 size={16} /> Edit
        </button>
      </div>

      {/* Display */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Title</p>
          <p className="font-semibold text-gray-900">{consultationData?.title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fee</p>
          <p className="font-semibold text-gray-900">Rs. {consultationData?.fee}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Description</p>
          <p className="font-semibold text-gray-900">{consultationData?.description}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-semibold text-gray-900">{consultationData?.duration} mins</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Modes</p>
          <p className="font-semibold text-gray-900">
            {consultationData?.modes?.length
              ? consultationData.modes.join(", ")
              : "None"}
          </p>
        </div>
      </div>

      {/* Modal */}
      {editing && (
        <EditModal title="Edit Consultation Setup" onClose={closeModal} onSave={saveChanges}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData?.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fee</label>
                <input
                  type="number"
                  min={0}
                  value={formData?.fee}
                  onChange={(e) => handleInputChange("fee", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (mins)</label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={formData?.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Modes</p>
              <div className="flex gap-4">
                {["online", "physical"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData?.modes?.includes(mode)}
                      onChange={() => handleModeToggle(mode)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </EditModal>
      )}
    </div>
  );
}

export default ConsultationSetup;
