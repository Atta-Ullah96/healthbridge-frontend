import { useState } from "react";
import {
  MapPin,
  Video,
  Award,
  Languages,
  Search,
  X,
  SlidersHorizontal,
  Stethoscope,
  Star,
  PhoneCall,
  Building2,
  User,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { useGetAllDoctorsQuery } from "../../../api/doctorApi";
import { Link } from "react-router-dom";

// ─── Reusable sub-components ──────────────────────────────────

const FilterLabel = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
    <Icon size={11} className="text-blue-500" />
    {children}
  </div>
);

const PillButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-[12.5px] font-semibold px-3.5 py-1 rounded-full border-[1.5px] transition-all duration-150 cursor-pointer
      ${active
        ? "bg-blue-700 border-blue-700 text-white"
        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
      }`}
  >
    {children}
  </button>
);

const MetaItem = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
      <Icon size={13} className="text-slate-500" />
    </div>
    <span className="text-[13px] text-slate-500 font-medium truncate">{children}</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────
export default function DoctorList() {
  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    location: "",
    rating: "",
    gender: "",
    consultationType: "",
  });

  const { data: doctors = [], isLoading, isError } = useGetAllDoctorsQuery(filters);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({ search: "", specialization: "", location: "", rating: "", gender: "", consultationType: "" });

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "").length;

  // ── Loading ──
  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-9 h-9 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
        <p className="text-slate-500 text-sm font-medium">Finding doctors…</p>
      </div>
    );

  // ── Error ──
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-sm font-medium">Something went wrong. Please refresh.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-sky-50">

      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
            Find a Doctor
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {doctors.length} verified specialists available
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex gap-6 items-start">

          {/* ════════ SIDEBAR ════════ */}
          <aside className="w-64 shrink-0 sticky top-24 hidden lg:block">
            <div className="bg-white border-[1.5px] border-slate-100 rounded-2xl shadow-sm overflow-hidden">

              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-blue-500" />
                  <span className="text-sm font-bold text-slate-800">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 font-semibold transition-colors cursor-pointer"
                  >
                    <X size={12} />
                    Clear all
                  </button>
                )}
              </div>

              {/* Filter Body */}
              <div className="p-5 flex flex-col gap-5">

                {/* Search */}
                <div>
                  <FilterLabel icon={Search}>Search</FilterLabel>
                  <input
                    type="text"
                    placeholder="Doctor name…"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-full border-[1.5px] border-slate-200 bg-slate-50 text-slate-800 text-[13.5px] placeholder-slate-400 px-3 py-2 rounded-xl outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <FilterLabel icon={Stethoscope}>Specialization</FilterLabel>
                  <input
                    type="text"
                    placeholder="e.g. Cardiologist"
                    value={filters.specialization}
                    onChange={(e) => handleFilterChange("specialization", e.target.value)}
                    className="w-full border-[1.5px] border-slate-200 bg-slate-50 text-slate-800 text-[13.5px] placeholder-slate-400 px-3 py-2 rounded-xl outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <div>
                  <FilterLabel icon={MapPin}>Location</FilterLabel>
                  <input
                    type="text"
                    placeholder="City or area…"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full border-[1.5px] border-slate-200 bg-slate-50 text-slate-800 text-[13.5px] placeholder-slate-400 px-3 py-2 rounded-xl outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Consultation Type */}
                <div>
                  <FilterLabel icon={Video}>Consultation Type</FilterLabel>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: "", label: "All" },
                      { val: "online", label: "Online" },
                      { val: "physical", label: "In-person" },
                    ].map(({ val, label }) => (
                      <PillButton
                        key={val}
                        active={filters.consultationType === val}
                        onClick={() => handleFilterChange("consultationType", val)}
                      >
                        {label}
                      </PillButton>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <FilterLabel icon={User}>Gender</FilterLabel>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: "", label: "Any" },
                      { val: "male", label: "Male" },
                      { val: "female", label: "Female" },
                    ].map(({ val, label }) => (
                      <PillButton
                        key={val}
                        active={filters.gender === val}
                        onClick={() => handleFilterChange("gender", val)}
                      >
                        {label}
                      </PillButton>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <FilterLabel icon={Star}>Minimum Rating</FilterLabel>
                  <div className="relative">
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange("rating", e.target.value)}
                      className="w-full appearance-none border-[1.5px] border-slate-200 bg-slate-50 text-slate-800 text-[13.5px] px-3 py-2 pr-9 rounded-xl outline-none transition cursor-pointer focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Any rating</option>
                      <option value="3">3★ and above</option>
                      <option value="4">4★ and above</option>
                      <option value="4.5">4.5★ and above</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

              </div>

              {/* Tip Box */}
              <div className="mx-4 mb-4 flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-3.5">
                <span className="text-sm mt-px">💡</span>
                <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                  Combine filters to narrow your search quickly.
                </p>
              </div>

            </div>
          </aside>

          {/* ════════ DOCTOR CARDS ════════ */}
          <main className="flex-1 min-w-0">

            <p className="text-[13px] text-slate-500 font-medium mb-4">
              Showing <strong className="text-slate-700">{doctors.length}</strong> doctors
            </p>

            {/* Empty State */}
            {doctors.length === 0 ? (
              <div className="bg-white border-[1.5px] border-slate-100 rounded-2xl py-20 text-center">
                <span className="text-4xl">🔍</span>
                <p className="text-slate-700 font-bold mt-3 text-base">No doctors found</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-5 text-blue-600 text-sm font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {doctors.map((doc, i) => (
                  <article
                    key={doc?._id}
                    className="bg-white border-[1.5px] border-slate-100 rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200 hover:shadow-blue-100/60"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6">

                      {/* ── Avatar Column ── */}
                      <div className="flex flex-col items-center gap-2.5 shrink-0">
                        <div className="relative inline-block">
                          <img
                            src={doc?.profilePic}
                            alt={`Dr. ${doc?.firstName}`}
                            className="w-28 h-28 rounded-2xl object-cover border-[3px] border-white"
                            style={{ boxShadow: "0 0 0 2px #dbeafe, 0 4px 16px rgba(29,78,216,.14)" }}
                          />
                          {doc?.consultationType?.includes("online") && (
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap border-2 border-white shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              Online
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        {doc?.rating && (
                          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full mt-1">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-800">{doc.rating}</span>
                            {doc?.reviewCount && (
                              <span className="text-[11px] text-amber-600">({doc.reviewCount})</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* ── Info Column ── */}
                      <div className="flex-1 min-w-0 flex flex-col gap-3">

                        {/* Name + Fee */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                              Dr. {doc?.firstName} {doc?.lastName}
                            </h2>
                            <p className="text-[13.5px] font-bold text-blue-600 mt-0.5">
                              {doc?.specialization}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xl font-extrabold text-slate-900">
                              Rs {doc?.consultationFee}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                              per session
                            </p>
                          </div>
                        </div>

                        {/* Consultation Tags */}
                        <div className="flex flex-wrap gap-2">
                          {doc?.consultationType?.includes("online") && (
                            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Video size={10} />
                              Video consult
                            </span>
                          )}
                          {doc?.consultationType?.includes("physical") && (
                            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                              <Building2 size={10} />
                              In-person
                            </span>
                          )}
                          {doc?.languages?.slice(0, 2).map((lang) => (
                            <span
                              key={lang}
                              className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                            >
                              <Languages size={10} />
                              {lang}
                            </span>
                          ))}
                        </div>

                        {/* Meta Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <MetaItem icon={MapPin}>{doc?.location}</MetaItem>
                          <MetaItem icon={Award}>{doc?.experience} yrs experience</MetaItem>
                          <MetaItem icon={Languages}>{doc?.languages?.join(", ")}</MetaItem>
                          <MetaItem icon={Wallet}>Rs {doc?.consultationFee}</MetaItem>
                        </div>

                        {/* Divider + Buttons */}
                        <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2.5 mt-1">
                          <Link
                            to={`/book/appointment/${doc?._id}`}
                            className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-blue-300/50"
                          >
                            <PhoneCall size={13} />
                            Book Appointment
                          </Link>
                          <Link
                            to={`/profile/${doc?._id}`}
                            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 border border-slate-200 text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
                          >
                            View Profile
                          </Link>
                        </div>

                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}