import { Star, MapPin, Clock, Award, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetDoctorProfileQuery } from "../../api/doctorApi";

export default function DoctorProfile() {


  const { id } = useParams();
  const { data: doctor } = useGetDoctorProfileQuery(id)
  console.log(doctor);



  return (
    <div className="cursor-pointer min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-12 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .doctor-name {
          font-family: 'Crimson Pro', serif;
          letter-spacing: -0.02em;
        }
        
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .slide-up {
          animation: slideUp 0.5s ease-out;
        }
        
        .slide-up-delay-1 {
          animation: slideUp 0.6s ease-out 0.1s both;
        }
        
        .slide-up-delay-2 {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        
        .slide-up-delay-3 {
          animation: slideUp 0.6s ease-out 0.3s both;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px rgba(59, 130, 246, 0.15);
        }
        
        .book-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .book-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .book-button:hover::before {
          left: 100%;
        }
        
        .book-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 16px -4px rgba(59, 130, 246, 0.3);
        }
        
        .review-card {
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .review-card:hover {
          border-left-color: #3b82f6;
          transform: translateX(4px);
          background-color: #f0f9ff;
        }
        
        .badge {
          transition: all 0.2s ease;
        }
        
        .badge:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden fade-in mb-6">
          <div className="relative">
            {/* Subtle decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"></div>

            <div className="relative px-8 pt-8 pb-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Doctor Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl"></div>
                  <img
                    src={doctor?.profilePic}
                    alt={doctor?.firstName}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-2 shadow-md">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Doctor? Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="doctor?-name text-4xl font-bold text-slate-800 mb-1">
                  Dr. {doctor?.firstName} {doctor?.lastName}
                  </h1>
                  <p className="text-blue-700 font-medium text-lg mb-3">
                    {doctor?.specialization}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold text-slate-800">
                        {doctor?.rating}
                      </span>
                      <span className="text-slate-500 text-sm">
                        ({doctor?.reviewsCount} reviews)
                      </span>
                    </div>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <span className="flex items-center gap-1.5 text-slate-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      {doctor?.location}
                    </span>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <span className="flex items-center gap-1.5 text-slate-600 text-sm">
                      <Clock className="w-4 h-4" />
                      {doctor?.languages.join(", ")}
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed max-w-2xl">
                    {doctor?.summary}
                  </p>
                </div>

                {/* Booking Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200/50 shadow-sm md:min-w-[200px]">
                  <div className="text-center mb-4">
                    <div className="text-sm text-blue-700 mb-1">Consultation Fee</div>
                    <div className="text-2xl font-bold text-slate-800">
                      {doctor?.consultationFee}
                    </div>
                  </div>
                  <Link to={`/book/appointment/${id}`}>
                    <button className="cursor-pointer book-button w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md">
                      Book Appointment
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Qualifications */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-6 slide-up-delay-1 hover-lift">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">
                Qualifications
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-slate-700">
                
                <span className="text-blue-600 font-semibold text-sm mt-0.5">
                  Experience:
                </span>
                <span className="font-medium">{doctor?.experience} years</span>
                

                <span className="text-blue-600 font-semibold text-sm mt-0.5">
                  qualifications:
                </span>
                <span className="font-medium">{doctor?.qualifications} years</span>
            
              </div>

            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-6 slide-up-delay-2 hover-lift">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">
                Availability
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {doctor?.availability.map((day, i) => (
                <span
                  key={i}
                  className="badge px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200/50 font-medium text-sm"
                >
                  {day.map(d=> <span>{d.isAvailable && d?.day + " "}</span>)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-6 mt-6 slide-up-delay-3 hover-lift">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-2">

            <span

              className="badge px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200/50 text-sm font-medium"
            >
              {doctor?.specialization}
            </span>

          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-6 mt-6 fade-in">
          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Patient Reviews
          </h2>
          <div className="space-y-3">
            {doctor?.reviews.map((review, i) => (
              <div key={i} className="review-card bg-slate-50/50 p-5 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-slate-800">
                      {review.name}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: Math.floor(review.rating) }).map(
                        (_, j) => (
                          <Star
                            key={j}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}