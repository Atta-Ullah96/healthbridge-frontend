import { nav } from "framer-motion/client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Sample doctor data (replace with API data)
const doctorsData = [
  { id: 1, name: "Dr. Sarah Khan", specialization: "Cardiologist", rating: 4.9, image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. John Smith", specialization: "Dentist", rating: 4.7, image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Aisha Malik", specialization: "Dermatologist", rating: 4.8, image: "https://randomuser.me/api/portraits/women/55.jpg" },
  { id: 4, name: "Dr. Imran Ali", specialization: "Cardiologist", rating: 4.6, image: "https://randomuser.me/api/portraits/men/41.jpg" },
  { id: 5, name: "Dr. Emily Brown", specialization: "Dentist", rating: 4.9, image: "https://randomuser.me/api/portraits/women/33.jpg" },
];

export default function DoctorList() {
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

    const navigate = useNavigate();

  // Get unique specializations
  const specializations = ["All", ...new Set(doctorsData.map(doc => doc.specialization))];

  // Filter doctors
  const filteredDoctors =
    selectedSpecialization === "All"
      ? doctorsData
      : doctorsData.filter(doc => doc.specialization === selectedSpecialization);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
        Find Your <span className="text-blue-600">Doctor</span>
      </h2>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        Browse our network of qualified doctors and find the one that suits your needs.
      </p>

      {/* Filter */}
      <div className="flex justify-center mb-12 flex-wrap gap-3">
        {specializations.map((spec, index) => (
          <button
            key={index}
            onClick={() => setSelectedSpecialization(spec)}
            className={`px-5 py-2 rounded-full border transition-all ${
              selectedSpecialization === spec
                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => navigate("/doctor/profile")}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-gray-700 font-medium">{doctor.rating}</span>
              </div>
              
              
             <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all">
                View Profile
              </button>
               
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
