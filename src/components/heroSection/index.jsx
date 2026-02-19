import { useState } from "react";
import { 
  Search, MapPin, Star, Shield, CheckCircle, 
  Clock, Video, ArrowRight, Calendar, Heart
} from "lucide-react";

export function Hero() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const chips = ["All", "Cardiology", "Pediatrics", "Dentistry", "Dermatology", "Psychiatry"];

  return (
    <div className="bg-white">
     

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            {/* Simple Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <CheckCircle size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Trusted by 50,000+ patients</span>
            </div>

            {/* Main Heading - Simple & Clear */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book trusted doctors in minutes
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find verified doctors near you, book appointments instantly, and get quality healthcare when you need it.
            </p>

            {/* Simple CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2">
                Find a Doctor
                <ArrowRight size={20} />
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg flex items-center gap-2">
                <Video size={20} />
                Video Consultation
              </button>
            </div>

            {/* Real Stats - Simple Layout */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  Average rating
                </div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Verified doctors</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy patients</div>
              </div>
            </div>
          </div>

          {/* Right Side - Clean Search Card */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Doctor</h3>
              <p className="text-gray-600 mb-6">Search by specialty, location, or doctor name</p>

              {/* Specialty Filter - Horizontal Scroll on Mobile */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setActiveChip(chip)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                      activeChip === chip
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Search Inputs - Clean & Simple */}
              <div className="space-y-4">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search doctors or specialties..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <MapPin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                  <Search size={20} />
                  Search Doctors
                </button>
              </div>

              {/* Popular Searches - Human Touch */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">Popular searches:</div>
                <div className="flex flex-wrap gap-2">
                  {["Fever", "Skin problems", "Child checkup", "Dental care"].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Doctor - Real Feel */}
            <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Dr. Sarah Khan"
                  className="w-16 h-16 rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-bold text-gray-900">Dr. Sarah Khan</div>
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <div className="text-gray-600 mb-2">Cardiologist • 10 years exp</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-gray-500">(234 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Available today
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
              <Clock size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Appointments</h3>
            <p className="text-gray-600">Book appointments in under 2 minutes. Same-day slots available.</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-4 bg-green-50 rounded-2xl mb-4">
              <Shield size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Doctors</h3>
            <p className="text-gray-600">All doctors are PMC certified and thoroughly verified.</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-4 bg-purple-50 rounded-2xl mb-4">
              <Video size={32} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Teleconsultation</h3>
            <p className="text-gray-600">Connect with doctors online from the comfort of your home.</p>
          </div>
        </div>

        {/* Patient Testimonial - Real & Authentic */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <div className="max-w-3xl">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-xl text-gray-900 mb-4 leading-relaxed">
              "I was able to book an appointment with a cardiologist the same day. The doctor was professional, and the whole process was smooth. Highly recommend HealthBridge!"
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Patient"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-900">Ahmed Ali</div>
                <div className="text-sm text-gray-600">Patient from Karachi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges - Simple & Clean */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Trusted & Certified</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield size={28} />
              <span className="font-semibold">PMC Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={28} />
              <span className="font-semibold">ISO Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Heart size={28} />
              <span className="font-semibold">Patient First</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}