import { Link, useLocation } from "react-router-dom";
import { useVerifyAppointmentQuery } from "../../../api/appointmentApi";

export default function AppointmentSuccess() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    const { data, isLoading, isError } = useVerifyAppointmentQuery(sessionId, {
        skip: !sessionId,
    });
    const appointmentData = data?.appointment





    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Appointment Confirmed!
                    </h1>
                    <p className="text-gray-600">
                        Your appointment has been successfully scheduled
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

                    {/* Booking ID Header */}
                    <div className="bg-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm mb-1">Booking ID</p>
                                <p className="text-white text-lg font-semibold">{appointmentData?.appointmentId}</p>
                            </div>
                            <span className="bg-white/20 px-3 py-1 rounded text-white text-sm font-medium">
                                {appointmentData?.appointmentType === "online" ? 'Online' : 'In-Person'}
                            </span>
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                            Appointment Details
                        </h2>

                        <div className="space-y-4">
                            {/* Doctor */}
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl mr-3">
                                    👨‍⚕️
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Doctor</p>
                                    <p className="text-base font-semibold text-gray-900">{appointmentData?.doctorName}</p>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-lg mr-3">
                                        📅
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Date</p>
                                        <p className="text-base font-semibold text-gray-900">{appointmentData?.dateOfAppointment.split("T")[0]}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-lg mr-3">
                                        ⏰
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Start Time</p>
                                        <p className="text-base font-semibold text-gray-900">{appointmentData?.startTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-lg mr-3">
                                        ⏰
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">End Time</p>
                                        <p className="text-base font-semibold text-gray-900">{appointmentData?.endTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address for physical appointments */}
                            {/* {!appointmentData?.appointmentType !== 'online' && appointmentData?.clinicAddress && (
                                <div className="flex items-start pt-2">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-lg mr-3">
                                        📍
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-base text-gray-900">{data.clinicAddress}</p>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="px-6 pb-6">
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                            <h3 className="text-base font-semibold text-gray-900 mb-3">
                                What's Next?
                            </h3>

                            {appointmentData?.appointmentType === 'online' ? (
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 font-bold mr-2">1.</span>
                                        <span>You will receive a meeting link via email 24 hours before your consultation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 font-bold mr-2">2.</span>
                                        <span>Make sure you have a stable internet connection and working camera/microphone</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 font-bold mr-2">3.</span>
                                        <span>Join the meeting 5 minutes early to test your setup</span>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 font-bold mr-2">1.</span>
                                        <span>Please arrive 10 minutes early to complete check-in formalities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 font-bold mr-2">2.</span>
                                        <span>Bring your ID and insurance card if applicable</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 font-bold mr-2">3.</span>
                                        <span>If you need to reschedule, please notify us at least 24 hours in advance</span>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link to={"/patient/dashboard/overview"} className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                                Dashboard
                            </Link>
                            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors">
                                Print Confirmation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-700">
                                A confirmation email has been sent to your registered email address.
                                If you have any questions, please contact our support team.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}