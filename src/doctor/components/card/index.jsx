import { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Video,
  Award,
  Languages,
  DollarSign,
  Search,
  X,
} from "lucide-react";
import { useGetAllDoctorsQuery } from "../../../api/doctorApi";
import { Link } from "react-router-dom";

export default function DoctorList() {
  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    location: "",
    rating: "",
    gender: "",
    consultationType: "",
  });

  // RTK Query Call
  const { data: doctors = [], isLoading, isError } =
    useGetAllDoctorsQuery(filters);
    

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      specialization: "",
      location: "",
      rating: "",
      gender: "",
      consultationType: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "" && v !== 0
  ).length;

  if (isLoading) {
    return <div className="text-center py-20">Loading doctors...</div>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Error loading doctors</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ================= FILTER SIDEBAR ================= */}
          <aside className="lg:block">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-20">
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 text-sm flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-4">

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search doctor..."
                  className="w-full border p-2 rounded-lg"
                  value={filters.search}
                  onChange={(e) =>
                    handleFilterChange("search", e.target.value)
                  }
                />

                {/* Specialization */}
                <input
                  type="text"
                  placeholder="Specialization"
                  className="w-full border p-2 rounded-lg"
                  value={filters.specialization}
                  onChange={(e) =>
                    handleFilterChange("specialization", e.target.value)
                  }
                />

                {/* Location */}
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border p-2 rounded-lg"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />

                {/* Consultation Type */}
                <select
                  className="w-full border p-2 rounded-lg"
                  value={filters.consultationType}
                  onChange={(e) =>
                    handleFilterChange("consultationType", e.target.value)
                  }
                >
                  <option value="">All Types</option>
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>

              </div>
            </div>
          </aside>

          {/* ================= DOCTOR CARDS ================= */}
          <main className="lg:col-span-3 cursor-pointer">
            <div className="mb-4 text-sm text-gray-600">
              Showing {doctors.length} doctors
            </div>

            <div className="space-y-4 ">
              {doctors.map((doc) => (
                <div
                  key={doc?._id}
                  className="bg-white rounded-2xl shadow-md border p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Profile Pic */}
                    <div className="relative">
                      <img
                        src={doc?.profilePic}
                        alt={doc?.firstName}
                        className="w-32 h-32 rounded-xl object-cover"
                      />
                      {doc?.consultationType?.includes("online") && (
                        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Video size={12} />
                          Online
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">
                        Dr. {doc?.firstName} {doc?.lastName}
                      </h3>

                      <p className="text-blue-600 font-medium">
                        {doc?.specialization}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
                        
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {doc?.location}
                        </div>

                        <div className="flex items-center gap-2">
                          <Award size={16} />
                          {doc?.experience} years experience
                        </div>

                        <div className="flex items-center gap-2">
                          <Languages size={16} />
                          {doc?.languages?.join(", ")}
                        </div>

                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          Rs {doc?.consultationFee}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link to={`/book/appointment/${doc?._id}`}className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-xl">
                          Book Now
                        </Link>
                        &nbsp;
                        <Link to={`/profile/${doc?._id}`} className=" cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-xl">
                          View Profile
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

              {doctors.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  No doctors found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
