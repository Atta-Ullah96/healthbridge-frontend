import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorVerificationPending = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-28 h-28 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m1-5a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-800 mb-4 tracking-tight">
          Registration Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-3">
          Thank you for registering as a doctor on <span className="font-semibold">HealthBridge</span>.
        </p>
        <p className="text-gray-600 text-base mb-6">
          Your account and certificates are under review by the relevant authorities. This process may take up to <span className="font-semibold">24–48 hours</span>. You will be notified  once your account is verified.
        </p>

        {/* Optional button */}
        <button
          onClick={() => navigate("/join-doctor")}
          className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-lg"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default DoctorVerificationPending;
