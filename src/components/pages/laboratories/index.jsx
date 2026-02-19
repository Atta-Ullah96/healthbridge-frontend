import { useState } from "react";
import { Search, MapPin, Phone, Mail, Clock, Star, Award, ChevronDown, Filter, X, CheckCircle } from "lucide-react";

const dummyLabs = [
  {
    id: 1,
    name: "City Lab Diagnostics",
    address: "123 Main Street, Peshawar",
    contactNumber: "+92 300 1234567",
    email: "contact@citylab.com",
    testsAvailable: ["Blood Test", "X-Ray", "MRI", "ECG"],
    openingHours: "9:00 AM - 6:00 PM",
    website: "https://citylab.com",
    premium: true,
    rating: 4.8,
    reviewCount: 284,
    distance: "2.3 km",
    logo: "https://via.placeholder.com/80",
    features: ["Home Sample Collection", "Online Reports", "24/7 Support"],
  },
  {
    id: 2,
    name: "HealthCheck Labs",
    address: "45 University Road, Peshawar",
    contactNumber: "+92 301 7654321",
    email: "info@healthcheck.com",
    testsAvailable: ["Blood Test", "CT Scan", "Ultrasound"],
    openingHours: "8:00 AM - 5:00 PM",
    website: "https://healthcheck.com",
    premium: false,
    rating: 4.2,
    reviewCount: 156,
    distance: "4.1 km",
    logo: "https://via.placeholder.com/80",
    features: ["Online Reports", "Parking Available"],
  },
  {
    id: 3,
    name: "Elite Diagnostics",
    address: "89 Mall Road, Peshawar",
    contactNumber: "+92 302 9876543",
    email: "support@elitediagnostics.com",
    testsAvailable: ["Blood Test", "X-Ray", "Ultrasound", "MRI", "CT Scan"],
    openingHours: "9:00 AM - 7:00 PM",
    website: "https://elitediagnostics.com",
    premium: true,
    rating: 4.9,
    reviewCount: 412,
    distance: "1.8 km",
    logo: "https://via.placeholder.com/80",
    features: ["Home Sample Collection", "Online Reports", "24/7 Support", "Wheelchair Accessible"],
  },
  {
    id: 4,
    name: "MediCore Laboratory",
    address: "67 Saddar Road, Peshawar",
    contactNumber: "+92 303 5551234",
    email: "care@medicore.com",
    testsAvailable: ["Blood Test", "X-Ray", "ECG", "Ultrasound"],
    openingHours: "7:00 AM - 9:00 PM",
    website: "https://medicore.com",
    premium: false,
    rating: 4.5,
    reviewCount: 198,
    distance: "3.5 km",
    logo: "https://via.placeholder.com/80",
    features: ["Extended Hours", "Online Reports"],
  },
];

function BookTestModal({ lab, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    test: lab.testsAvailable[0],
    datetime: "",
    homeCollection: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.datetime) {
      alert("Please fill in all required fields");
      return;
    }
    setStep(3);
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        {step !== 3 && (
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-1">Book Your Test</h2>
            <p className="text-teal-50">{lab.name}</p>
          </div>
        )}

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold">1</div>
                  <div className="w-16 h-1 bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-semibold">2</div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Patient Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 transition transform hover:scale-[1.02]"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold">✓</div>
                  <div className="w-16 h-1 bg-teal-600"></div>
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold">2</div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Test *</label>
                <select
                  name="test"
                  value={form.test}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                  {lab.testsAvailable.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Preferred Date & Time *</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={form.datetime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              {lab.features.includes("Home Sample Collection") && (
                <div className="bg-teal-50 p-4 rounded-xl">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="homeCollection"
                      checked={form.homeCollection}
                      onChange={handleChange}
                      className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-gray-700 font-medium">Request home sample collection (+Rs. 500)</span>
                  </label>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 transition transform hover:scale-[1.02]"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">
                Your test has been booked for <span className="font-semibold">{form.name}</span>
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
                <p><span className="font-semibold">Lab:</span> {lab.name}</p>
                <p><span className="font-semibold">Test:</span> {form.test}</p>
                <p><span className="font-semibold">Date:</span> {new Date(form.datetime).toLocaleString()}</p>
                {form.homeCollection && <p className="text-teal-600 font-semibold">✓ Home collection requested</p>}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                A confirmation email has been sent to {form.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Laboratories() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLab, setSelectedLab] = useState(null);
  const [sortBy, setSortBy] = useState("distance");
  const [filterTest, setFilterTest] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const allTests = ["all", ...new Set(dummyLabs.flatMap(lab => lab.testsAvailable))];

  let labsToShow = activeTab === "premium" 
    ? dummyLabs.filter(lab => lab.premium)
    : dummyLabs;

  if (filterTest !== "all") {
    labsToShow = labsToShow.filter(lab => lab.testsAvailable.includes(filterTest));
  }

  labsToShow = labsToShow.filter(lab =>
    lab.name.toLowerCase().includes(search.toLowerCase()) ||
    lab.testsAvailable.some(test => test.toLowerCase().includes(search.toLowerCase())) ||
    lab.address.toLowerCase().includes(search.toLowerCase())
  );

  labsToShow.sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Find Medical Laboratories
          </h1>
          <p className="text-gray-600 text-lg">
            Book tests at verified labs near you
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by lab name, test, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          <div className={`mt-4 space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-wrap gap-3">
              {["all", "premium"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl font-semibold transition ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab === "premium" ? (
                    <span className="flex items-center space-x-1">
                      <Award size={16} />
                      <span>Premium Labs</span>
                    </span>
                  ) : (
                    "All Labs"
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Test</label>
                <select
                  value={filterTest}
                  onChange={(e) => setFilterTest(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                  {allTests.map(test => (
                    <option key={test} value={test}>
                      {test === "all" ? "All Tests" : test}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                  <option value="distance">Nearest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">{labsToShow.length}</span> {labsToShow.length === 1 ? 'laboratory' : 'laboratories'} found
          </p>
        </div>

        {/* Labs Grid */}
        {labsToShow.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No laboratories found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {labsToShow.map((lab) => (
              <div
                key={lab.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                        <img
                          src={lab.logo}
                          alt={lab.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition">
                              {lab.name}
                            </h2>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-yellow-500">
                                <Star size={16} fill="currentColor" />
                                <span className="ml-1 font-semibold text-gray-800">{lab.rating}</span>
                              </div>
                              <span className="text-gray-400 text-sm">({lab.reviewCount} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {lab.premium && (
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center space-x-1">
                        <Award size={12} />
                        <span>Premium</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0 text-teal-600" />
                      <span>{lab.address}</span>
                      <span className="ml-auto text-teal-600 font-semibold whitespace-nowrap">{lab.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone size={16} className="flex-shrink-0 text-teal-600" />
                      <span>{lab.contactNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail size={16} className="flex-shrink-0 text-teal-600" />
                      <span className="truncate">{lab.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={16} className="flex-shrink-0 text-teal-600" />
                      <span>{lab.openingHours}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Tests:</h4>
                    <div className="flex flex-wrap gap-2">
                      {lab.testsAvailable.map((test, i) => (
                        <span
                          key={i}
                          className="bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full border border-teal-200"
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>

                  {lab.features.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {lab.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs text-gray-600 flex items-center space-x-1"
                          >
                            <CheckCircle size={14} className="text-green-500" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedLab(lab)}
                      className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:from-teal-700 hover:to-cyan-700 transition transform hover:scale-[1.02]"
                    >
                      Book Test
                    </button>
                    {lab.website && (
                      <a
                        href={lab.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLab && (
        <BookTestModal lab={selectedLab} onClose={() => setSelectedLab(null)} />
      )}
    </div>
  );
}