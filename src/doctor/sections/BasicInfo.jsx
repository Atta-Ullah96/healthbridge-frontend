import { useEffect, useRef, useState } from 'react';
import { Edit2, Upload, User } from 'lucide-react';
import { EditModal } from '../pages/ProfilePage'; // your generic modal
import { useCompleteUploadMutation, useGetBasicInfoQuery, useInitiateUploadMutation, useUpdateBasicInfoMutation } from '../../api/doctorApi';



function BasicInfo() {
  const [doctor, setDoctor] = useState(null);
  const [basicInfo, setBasicInfo] = useState({});
 
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef(null);
  const { data } = useGetBasicInfoQuery();
  const [initiateUpload ] = useInitiateUploadMutation();
  const [completeUpload , {isLoading}] = useCompleteUploadMutation();
  const [updateBasicInfo] = useUpdateBasicInfoMutation();

  useEffect(() => {
    if (data?.doctorInfo) {
      setDoctor(data?.doctorInfo);
    }
  }, [data]);

  // Open modal
  const openModal = () => {
    setBasicInfo(data?.doctorInfo)
    setEditing(true);
  };

  // Close modal
  const closeModal = () => setEditing(false);

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };


  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG allowed");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();


    reader.onload = () => {
      setBasicInfo((prev) => ({
        ...prev,
        profileImageUrl: reader.result, // preview only
      }));
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Save changes
  const saveChanges = async () => {
    try {
      let profileImageId = doctor?.profileImageId;

      // 1️⃣ Upload image if changed
      if (selectedFile) {
        const initRes = await initiateUpload({
          fileName: selectedFile.name,
          contentType: selectedFile.type,
          size: selectedFile.size,
          purpose:"profile_photo"
        }).unwrap();

        await fetch(initRes.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });

        await completeUpload({ uploadId: initRes.uploadId }).unwrap();
        profileImageId = initRes?.uploadId;
      }

      // 2️⃣ Save basic info
      const updatedDoctor = await updateBasicInfo({
        ...basicInfo,
        profileImage: profileImageId,
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
          <User size={22} className="text-blue-600" /> Basic Information
        </h2>
        <button
          onClick={openModal}
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          <Edit2 size={16} /> Edit
        </button>
      </div>

      {/* Display Data */}
      <div className="flex items-start gap-6 cursor-pointer">
        <img
          src={doctor?.profileImageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
        />
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold text-gray-900">
              Dr. {doctor?.firstName} {doctor?.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-semibold text-gray-900">{doctor?.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-semibold text-gray-900">{doctor?.dob ? doctor?.dob.split("T")[0] : null}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold text-gray-900">{doctor?.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-900">{doctor?.email}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {editing && (
        <EditModal title="Edit Basic Information" onClose={closeModal} onSave={saveChanges} onLoading={isLoading}>
          <div className="space-y-4">
            <div className="text-center mb-6">
              <img
                src={basicInfo?.profileImageUrl || "/default-profile.png"}
                alt="Profile"
                className="cursor-pointer w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-gray-100"
              />
              <button
                type="button"
                onClick={handleButtonClick}
                className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mx-auto"
              >
                <Upload size={16} /> Change Photo
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={basicInfo?.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={basicInfo?.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={basicInfo?.gender || ""}  // fallback to empty string
                onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={basicInfo?.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={basicInfo?.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={basicInfo?.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </EditModal>
      )}
    </div>
  );
}

export default BasicInfo;
