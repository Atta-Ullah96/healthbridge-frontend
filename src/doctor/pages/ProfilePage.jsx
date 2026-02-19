import { CheckCircle, AlertCircle,X } from 'lucide-react';
import BasicInfo from '../sections/BasicInfo';
import ProfessionalDetails from '../sections/Professional';
import ConsultationSetup from '../sections/Consultation';
import ProfileSummary from '../sections/ProfileSummary';
import Location from '../sections/Location';
import AvailabilitySettings from '../sections/Availability';
import DoctorDocuments from '../sections/DocumentsUpload';
import { useGetProfileCompletedQuery } from '../../api/doctorApi';


export function EditModal({ title, children, onClose, onSave, onLoading }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className=" cursor-pointer text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className=" cursor-pointer px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className=" cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {
              onLoading ? "Saving" : "Saved Changes"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { data } = useGetProfileCompletedQuery()
  const profileComplete = data?.isComplete
  const verified =true

  return (<>

    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your professional profile and information</p>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 sticky top-15">
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#2563eb"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - data?.completion / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{data?.completion}%</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Completion</h3>
              <p className="text-sm text-gray-600">
                Complete your profile to increase visibility and trust with patients
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <BasicInfo />
        {/* Basic Information */}

        {/* Professional Details */}
        <ProfessionalDetails />
        {/* Professional Details */}

        {/* Profile Summary */}
        <ProfileSummary />
        {/* Profile Summary */}

        {/* DocuemntsUpload */}
        <DoctorDocuments />
        {/* DocuemntsUpload */}


        {/* Consultation Setup */}
        <ConsultationSetup />
        {/* Consultation Setup */}

        {/* Availability */}
        <AvailabilitySettings />
        {/* Availability */}
        <br />
        {/* Location */}
        <Location />
        {/* Location */}






        {/* Verification Status */}
        <div className={`rounded-2xl p-6 shadow-sm ${verified ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
          <div className="flex items-start gap-3">
            {verified ? (
              <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle size={24} className="text-yellow-600 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {verified ? 'Profile Verified' : 'Verification Pending'}
              </h3>
              <p className="text-sm text-gray-700">
                {verified
                  ? 'Your profile has been verified by admin. You can now receive patient bookings.'
                  : 'Your profile is under review. Admin will verify your credentials within 24-48 hours.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </>
  );
}

export default ProfilePage;