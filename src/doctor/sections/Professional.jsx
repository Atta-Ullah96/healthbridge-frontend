import { useEffect, useRef, useState } from "react";
import { Edit2, FileText, User } from "lucide-react";
import { EditModal } from "../pages/ProfilePage"; // import your generic modal
import { useGetProfessionalDetailsQuery, useUpdateProfessionalDetailsMutation } from "../../api/doctorApi";



function ProfessionalDetails() {
  const [editing, setEditing] = useState(false);
  const [professionalData, setProfessionalData] = useState(null);

  const [formData, setFormData] = useState({});
  const { data } = useGetProfessionalDetailsQuery();
  const [updateProfessionalDetails, { isLoading }] = useUpdateProfessionalDetailsMutation();
  

  useEffect(() => {
    if (data?.data) {
      setProfessionalData(data?.data);

    }
  }, [data]);

  // Open modal
  const openModal = () => {
    setFormData(data?.data);
    setEditing(true);
  };

  // Close modal
  const closeModal = () => setEditing(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };


  const saveChanges = async () => {
    try {
       await updateProfessionalDetails({
        ...formData,
      }).unwrap();

      closeModal();
    } catch (err) {
      alert(err || "Failed to update profile");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText size={22} className="text-blue-600" /> Professional Details
        </h2>
        <button
          onClick={openModal}
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          <Edit2 size={16} /> Edit
        </button>
      </div>

      {/* Display professional info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Specialization</p>
          <p className="font-semibold text-gray-900">{professionalData?.specialization}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Years of Experience</p>
          <p className="font-semibold text-gray-900">{professionalData?.yearsOfExperience}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">PMC Number</p>
          <p className="font-semibold text-gray-900">{professionalData?.pmcNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Qualification</p>
          <p className="font-semibold text-gray-900">{professionalData?.qualification}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Institute / University</p>
          <p className="font-semibold text-gray-900">{professionalData?.institute}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Graduation Year</p>
          <p className="font-semibold text-gray-900">{professionalData?.graduationYear}</p>
        </div>

      </div>

      {/* Modal */}
      {editing && (
        <EditModal title="Edit Professional Details" onClose={closeModal} onSave={saveChanges}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <input
                  type="text"
                  value={formData?.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="number"
                  min={0}
                  value={formData?.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PMC Number</label>
                <input
                  type="text"
                  value={formData?.pmcNumber}
                  onChange={(e) => handleInputChange('pmcNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={formData?.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institute / University</label>
                <input
                  type="text"
                  value={formData?.institute}
                  onChange={(e) => handleInputChange('institute', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="number"
                  min={1900}
                  max={new Date().getFullYear()}
                  value={formData?.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>


          </div>
        </EditModal>
      )}
    </div>
  );
}

export default ProfessionalDetails;
