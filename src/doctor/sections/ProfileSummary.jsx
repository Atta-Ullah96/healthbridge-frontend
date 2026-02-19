import { useEffect, useState } from "react";
import { Edit2, FileText } from "lucide-react";
import { EditModal } from "../pages/ProfilePage";
import { useGetProfileSummaryQuery, useUpdateProfileSummaryMutation } from "../../api/doctorApi";

;

function ProfileSummary({ onSave }) {
  const [editing, setEditing] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const [formdata, setFormData] = useState({});
  const { data } = useGetProfileSummaryQuery()
  const [updateProfileSummary, { isLoadnig }] = useUpdateProfileSummaryMutation()

  useEffect(() => {
    if (data) {
      setSummaryData(data);

    }
  }, [data]);
  const openModal = () => {
    setFormData(data);
    setEditing(true);
  };
  const closeModal = () => setEditing(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formdata, [field]: value });
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => {
      const currentArray = prev[field] || [];

      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter((item) => item !== value) // ❌ remove
          : [...currentArray, value],                     // ✅ add
      };
    });
  };

  const saveChanges = async () => {
    try {
      await updateProfileSummary({
        ...formdata,
      }).unwrap();

      closeModal();
    } catch (err) {
      alert(err || "Failed to update profile");
    }
  };


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText size={22} className="text-purple-600" />
            Profile Summary
          </h2>
          <button
            onClick={openModal}
            className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            <Edit2 size={16} />
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">About</p>
            <p className="text-gray-900">{summaryData?.about}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {summaryData?.languages?.map((lang, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <EditModal title="Edit Profile Summary" onClose={closeModal} onSave={saveChanges}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About / Summary</label>
              <textarea
                value={formdata?.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                rows="10"
                placeholder="Write a brief summary about yourself and your practice..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
              <div className="grid grid-cols-2 gap-2">
                {['English', 'Urdu', 'Punjabi', 'Pashto', 'Sindhi', 'Balochi'].map(lang => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formdata?.languages?.includes(lang)}
                      onChange={() => handleArrayToggle('languages', lang)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{lang}</span>
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

export default ProfileSummary;
