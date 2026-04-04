import { CheckCircle, Star, Shield, Video, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const doctors = [
  {
    name: "Dr. Sarah Khan",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 234,
    available: true,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Ali Raza",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 187,
    available: true,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const stats = [
  { value: "2,500+", label: "Verified Doctors" },
  { value: "50K+",   label: "Happy Patients"  },
  { value: "4.9",    label: "Avg. Rating", star: true },
];

const features = [
  {
    icon: Clock,
    color: "bg-blue-50 text-blue-600",
    title: "Book in Minutes",
    desc: "Same-day appointments available with top specialists.",
  },
  {
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600",
    title: "PMC Verified",
    desc: "Every doctor is certified and thoroughly verified.",
  },
  {
    icon: Video,
    color: "bg-violet-50 text-violet-600",
    title: "Video Consult",
    desc: "See a doctor from the comfort of your home.",
  },
];

export function Hero() {
  return (
    <section className="bg-white overflow-hidden">

      {/* ── Main Hero ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-7">
              <CheckCircle size={15} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                Trusted by 50,000+ patients across Pakistan
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Quality healthcare,{" "}
              <span className="text-blue-600">one click away.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              Find verified doctors near you, book appointments instantly, and
              get the care you deserve — without the wait.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 text-sm"
              >
                Find a Doctor
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/doctors?type=online"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200 text-sm"
              >
                <Video size={16} className="text-slate-500" />
                Video Consult
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-100">
              {stats.map(({ value, label, star }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {value}
                    </span>
                    {star && (
                      <Star size={16} className="text-amber-400 fill-amber-400 mt-0.5" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Doctor Cards ── */}
          <div className="flex flex-col gap-4">

            {/* Header row */}
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold text-slate-700">
                Available right now
              </p>
              <Link
                to="/doctors"
                className="text-sm font-semibold text-blue-600 hover:underline underline-offset-2 flex items-center gap-1"
              >
                See all
                <ArrowRight size={13} />
              </Link>
            </div>

            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
              >
                <div className="relative shrink-0">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  {doc.available && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 text-sm truncate">{doc.name}</p>
                    <CheckCircle size={14} className="text-blue-500 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {doc.specialty}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">
                      {doc.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({doc.reviews} reviews)
                    </span>
                  </div>
                </div>

                <Link
                  to={`/doctors`}
                  className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Book
                </Link>
              </div>
            ))}

            {/* Availability note */}
            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <p className="text-xs font-semibold text-emerald-700">
                38 doctors are available for appointments today
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Features Strip ── */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="flex-1">
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-300 fill-amber-300" />
              ))}
            </div>
            <p className="text-white text-lg sm:text-xl font-medium leading-relaxed mb-6 max-w-xl">
              "I booked a cardiologist the same day. The process was so smooth —
              I didn't have to wait at all. This is how healthcare should work."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/54.jpg"
                alt="Ahmed Ali"
                className="w-10 h-10 rounded-full border-2 border-white/30"
              />
              <div>
                <p className="text-white font-bold text-sm">Ahmed Ali</p>
                <p className="text-blue-200 text-xs font-medium">Patient from Karachi</p>
              </div>
            </div>
          </div>

          {/* Right side CTA */}
          <div className="shrink-0">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
            >
              Book Your Appointment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}