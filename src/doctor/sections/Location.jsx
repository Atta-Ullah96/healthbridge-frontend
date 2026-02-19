import { useEffect, useState } from "react";
import { Edit2, MapPin } from "lucide-react";
import { EditModal } from "../pages/ProfilePage";
import { useGetLocationQuery, useUpdateLocationMutation } from "../../api/doctorApi";



function Location({ onSave }) {
    const [editing, setEditing] = useState(false);
    const [locationData, setLocationData] = useState(null);
    const [tempData, setTempData] = useState({
        city: '',
        address: "",
        mapLink: "",
        clinicName: ""
    });

    const { data } = useGetLocationQuery()
    const [updateLocation] = useUpdateLocationMutation()

    useEffect(() => {

        if (data) {
            setLocationData(data)
        }
    }, [data])
    const openModal = () => {
        setTempData(data);
        setEditing(true);
    };
    const closeModal = () => setEditing(false);

    const handleInputChange = (field, value) => {
        setTempData({ ...tempData, [field]: value });
    };

    const saveChanges = async () => {
        try {
            await updateLocation({
                ...tempData,
            }).unwrap();

            closeModal();
        } catch (err) {
            alert(err || "Failed to update profile");
        }
    };

    return (

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin size={22} className="text-red-600" />
                    Location & Clinic
                </h2>
                <button
                    onClick={openModal}
                    className=" cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                    <Edit2 size={16} />
                    Edit
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-semibold text-gray-900">{locationData?.city}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Clinic Name</p>
                    <p className="font-semibold text-gray-900">{locationData?.clinicName}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-900">{locationData?.address}</p>
                </div>
                {
                    location?.mapLink && <div className="col-span-2">
                        <p className="text-sm text-gray-500">Link</p>
                        <p className="font-semibold text-gray-900">{locationData?.mapLink}</p>
                    </div>
                }

            </div>
            {
                editing && <EditModal title="Edit Location & Clinic" onClose={closeModal} onSave={saveChanges}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                value={tempData?.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="e.g., Peshawar"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                            <input
                                type="text"
                                value={tempData?.clinicName}
                                onChange={(e) => handleInputChange('clinicName', e.target.value)}
                                placeholder="e.g., Heart Care Clinic"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <textarea
                                value={tempData?.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                rows="3"
                                placeholder="Enter complete clinic address"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Link (Optional)</label>
                            <input
                                type="url"
                                value={tempData?.mapLink}
                                onChange={(e) => handleInputChange('mapLink', e.target.value)}
                                placeholder="https://maps.google.com/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </EditModal>
            }
        </div>


    );
}

export default Location;
