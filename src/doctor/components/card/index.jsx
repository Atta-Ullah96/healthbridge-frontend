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

  const { data: doctors = [], isLoading, isError } = useGetAllDoctorsQuery(filters);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({ search: "", specialization: "", location: "", rating: "", gender: "", consultationType: "" });

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "").length;

  if (isLoading)
    return (
      <div style={S.loaderWrap}>
        <div style={S.spinner} />
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 14 }}>Finding doctors…</p>
      </div>
    );

  if (isError)
    return (
      <div style={S.loaderWrap}>
        <p style={{ color: "#ef4444", fontSize: 14 }}>Something went wrong. Please refresh.</p>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Lora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Nunito', sans-serif; }

        .dl-input {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #1e293b;
          font-family: 'Nunito', sans-serif;
          font-size: 13.5px;
          padding: 9px 13px;
          border-radius: 10px;
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .dl-input::placeholder { color: #94a3b8; }
        .dl-input:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(59,130,246,.13);
        }

        .dl-select {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #1e293b;
          font-family: 'Nunito', sans-serif;
          font-size: 13.5px;
          padding: 9px 36px 9px 13px;
          border-radius: 10px;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 11px center;
          cursor: pointer;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .dl-select:focus {
          border-color: #3b82f6;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(59,130,246,.13);
        }

        .dl-pill {
          font-family: 'Nunito', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          background: #f8fafc;
          cursor: pointer;
          transition: all .18s;
          user-select: none;
        }
        .dl-pill:hover { border-color: #93c5fd; color: #3b82f6; background: #eff6ff; }
        .dl-pill.active { background: #1d4ed8; border-color: #1d4ed8; color: #fff; }

        .dl-card {
          background: #fff;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          transition: box-shadow .25s, transform .25s, border-color .25s;
        }
        .dl-card:hover {
          box-shadow: 0 10px 36px rgba(30,58,138,.11);
          transform: translateY(-2px);
          border-color: #c7d8fa;
        }

        .dl-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1d4ed8;
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 9px 20px;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background .2s, box-shadow .2s;
        }
        .dl-btn-primary:hover { background: #1e40af; box-shadow: 0 4px 14px rgba(29,78,216,.3); }

        .dl-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          color: #475569;
          font-family: 'Nunito', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 9px 20px;
          border-radius: 10px;
          text-decoration: none;
          border: 1.5px solid #e2e8f0;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }
        .dl-btn-ghost:hover { background: #e2e8f0; color: #1e293b; border-color: #cbd5e1; }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        .pulse-dot { animation: pulse 2s infinite; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .dl-spinner { 
          width: 36px; height: 36px; border-radius: 50%;
          border: 3.5px solid #dbeafe; border-top-color: #3b82f6;
          animation: spin 0.75s linear infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dl-card-anim { animation: fadeUp .3s ease both; }

        @media (max-width: 900px) {
          .dl-grid { flex-direction: column !important; }
          .dl-sidebar { width: 100% !important; position: static !important; }
          .dl-card-body { flex-direction: column !important; }
        }
        @media (max-width: 600px) {
          .dl-name-fee { flex-direction: column !important; }
        }
      `}</style>

      <div style={S.page}>

        {/* ── Top bar ── */}
        <div style={S.topBar}>
          <div style={S.topBarInner}>
            <div>
              <h1 style={S.pageTitle}>Find a Doctor</h1>
              <p style={S.pageSubtitle}>{doctors.length} verified specialists available</p>
            </div>
          </div>
        </div>

        <div style={S.body}>
          <div className="dl-grid" style={S.grid}>

            {/* ════ SIDEBAR ════ */}
            <aside className="dl-sidebar" style={S.sidebar}>
              <div style={S.sidebarCard}>

                {/* header */}
                <div style={S.sidebarHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <SlidersHorizontal size={15} color="#3b82f6" />
                    <span style={S.sidebarTitle}>Filters</span>
                    {activeFiltersCount > 0 && (
                      <span style={S.filterBadge}>{activeFiltersCount}</span>
                    )}
                  </div>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} style={S.clearBtn}>
                      <X size={13} style={{ marginRight: 3 }} />
                      Clear all
                    </button>
                  )}
                </div>

                {/* body */}
                <div style={S.sidebarBody}>

                  <div style={S.filterGroup}>
                    <label style={S.filterLabel}>
                      <Search size={12} color="#3b82f6" />
                      Search
                    </label>
                    <input
                      className="dl-input"
                      type="text"
                      placeholder="Doctor name…"
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                  </div>

                  <div style={S.filterGroup}>
                    <label style={S.filterLabel}>
                      <Stethoscope size={12} color="#3b82f6" />
                      Specialization
                    </label>
                    <input
                      className="dl-input"
                      type="text"
                      placeholder="e.g. Cardiologist"
                      value={filters.specialization}
                      onChange={(e) => handleFilterChange("specialization", e.target.value)}
                    />
                  </div>

                  <div style={S.filterGroup}>
                    <label style={S.filterLabel}>
                      <MapPin size={12} color="#3b82f6" />
                      Location
                    </label>
                    <input
                      className="dl-input"
                      type="text"
                      placeholder="City or area…"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                    />
                  </div>

                  <div style={S.filterGroup}>
                    <label style={S.filterLabel}>
                      <Video size={12} color="#3b82f6" />
                      Consultation Type
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {[{ val: "", label: "All" }, { val: "online", label: "Online" }, { val: "physical", label: "In-person" }].map(({ val, label }) => (
                        <button
                          key={val}
                          className={`dl-pill${filters.consultationType === val ? " active" : ""}`}
                          onClick={() => handleFilterChange("consultationType", val)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={S.filterGroup}>
                    <label style={S.filterLabel}>
                      <User size={12} color="#3b82f6" />
                      Gender
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {[{ val: "", label: "Any" }, { val: "male", label: "Male" }, { val: "female", label: "Female" }].map(({ val, label }) => (
                        <button
                          key={val}
                          className={`dl-pill${filters.gender === val ? " active" : ""}`}
                          onClick={() => handleFilterChange("gender", val)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...S.filterGroup, paddingBottom: 0 }}>
                    <label style={S.filterLabel}>
                      <Star size={12} color="#3b82f6" />
                      Minimum Rating
                    </label>
                    <select
                      className="dl-select"
                      value={filters.rating}
                      onChange={(e) => handleFilterChange("rating", e.target.value)}
                    >
                      <option value="">Any rating</option>
                      <option value="3">3★ and above</option>
                      <option value="4">4★ and above</option>
                      <option value="4.5">4.5★ and above</option>
                    </select>
                  </div>

                </div>

                {/* tip */}
                <div style={S.tipBox}>
                  <span>💡</span>
                  <span style={{ fontSize: 12, color: "#1d4ed8", fontWeight: 600, lineHeight: 1.5 }}>
                    Combine filters to narrow your search quickly.
                  </span>
                </div>

              </div>
            </aside>

            {/* ════ DOCTOR CARDS ════ */}
            <main style={{ flex: 1, minWidth: 0 }}>

              <p style={S.resultCount}>
                Showing <strong>{doctors.length}</strong> doctors
              </p>

              {doctors.length === 0 ? (
                <div style={S.emptyState}>
                  <span style={{ fontSize: 40 }}>🔍</span>
                  <p style={{ fontWeight: 700, color: "#334155", marginTop: 12, fontSize: 15 }}>No doctors found</p>
                  <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Try adjusting your filters</p>
                  <button onClick={clearFilters} style={{ ...S.clearBtn, marginTop: 16, fontSize: 13, color: "#3b82f6" }}>
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {doctors.map((doc, i) => (
                    <article
                      key={doc?._id}
                      className="dl-card dl-card-anim"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="dl-card-body" style={S.cardInner}>

                        {/* Avatar column */}
                        <div style={S.avatarCol}>
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                              src={doc?.profilePic}
                              alt={`Dr. ${doc?.firstName}`}
                              style={S.avatar}
                            />
                            {doc?.consultationType?.includes("online") && (
                              <span style={S.onlineBadge}>
                                <span
                                  className="pulse-dot"
                                  style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#fff", marginRight: 4 }}
                                />
                                Online
                              </span>
                            )}
                          </div>

                          {doc?.rating && (
                            <div style={S.ratingPill}>
                              <Star size={11} color="#f59e0b" fill="#f59e0b" />
                              <span style={{ fontWeight: 800, color: "#92400e", fontSize: 12 }}>{doc.rating}</span>
                              {doc?.reviewCount && (
                                <span style={{ color: "#b45309", fontSize: 11 }}>({doc.reviewCount})</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Info column */}
                        <div style={{ flex: 1, minWidth: 0 }}>

                          {/* Name + Fee */}
                          <div className="dl-name-fee" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div>
                              <h2 style={S.docName}>Dr. {doc?.firstName} {doc?.lastName}</h2>
                              <p style={S.docSpec}>{doc?.specialization}</p>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <p style={S.feeAmount}>Rs {doc?.consultationFee}</p>
                              <p style={S.feeLabel}>per session</p>
                            </div>
                          </div>

                          {/* Tags */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
                            {doc?.consultationType?.includes("online") && (
                              <span style={{ ...S.tag, background: "#ecfdf5", color: "#059669", borderColor: "#a7f3d0" }}>
                                <Video size={10} style={{ marginRight: 3 }} />Video consult
                              </span>
                            )}
                            {doc?.consultationType?.includes("physical") && (
                              <span style={{ ...S.tag, background: "#f5f3ff", color: "#7c3aed", borderColor: "#ddd6fe" }}>
                                <Building2 size={10} style={{ marginRight: 3 }} />In-person
                              </span>
                            )}
                            {doc?.languages?.slice(0, 2).map((lang) => (
                              <span key={lang} style={{ ...S.tag, background: "#fffbeb", color: "#d97706", borderColor: "#fde68a" }}>
                                <Languages size={10} style={{ marginRight: 3 }} />{lang}
                              </span>
                            ))}
                          </div>

                          {/* Meta — icons sit beside text, never overlapping */}
                          <div style={S.metaGrid}>
                            <div style={S.metaItem}>
                              <div style={S.metaIconBox}><MapPin size={13} color="#64748b" /></div>
                              <span style={S.metaText}>{doc?.location}</span>
                            </div>
                            <div style={S.metaItem}>
                              <div style={S.metaIconBox}><Award size={13} color="#64748b" /></div>
                              <span style={S.metaText}>{doc?.experience} yrs experience</span>
                            </div>
                            <div style={S.metaItem}>
                              <div style={S.metaIconBox}><Languages size={13} color="#64748b" /></div>
                              <span style={S.metaText}>{doc?.languages?.join(", ")}</span>
                            </div>
                            <div style={S.metaItem}>
                              <div style={S.metaIconBox}><Wallet size={13} color="#64748b" /></div>
                              <span style={S.metaText}>Rs {doc?.consultationFee}</span>
                            </div>
                          </div>

                          {/* Divider + Buttons */}
                          <div style={{ borderTop: "1.5px solid #f1f5f9", marginTop: 16, paddingTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
                            <Link to={`/book/appointment/${doc?._id}`} className="dl-btn-primary">
                              <PhoneCall size={13} />
                              Book Appointment
                            </Link>
                            <Link to={`/profile/${doc?._id}`} className="dl-btn-ghost">
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
    </>
  );
}

// ─── All styles as plain JS objects — zero Tailwind positional conflicts ───
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(145deg,#f0f4ff 0%,#f8fafc 50%,#f0f9ff 100%)",
    fontFamily: "'Nunito', sans-serif",
  },
  loaderWrap: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    fontFamily: "'Nunito', sans-serif",
  },
  spinner: {
    width: 36, height: 36, borderRadius: "50%",
    border: "3.5px solid #dbeafe", borderTopColor: "#3b82f6",
    animation: "spin 0.75s linear infinite",
  },
  topBar: {
    background: "#fff", borderBottom: "1.5px solid #e8edf5",
    position: "sticky", top: 0, zIndex: 30,
  },
  topBarInner: {
    maxWidth: 1280, margin: "0 auto", padding: "16px 28px",
  },
  pageTitle: {
    fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 700,
    color: "#0f172a", margin: 0, lineHeight: 1.2,
  },
  pageSubtitle: {
    fontSize: 12.5, color: "#94a3b8", marginTop: 3, fontWeight: 500,
  },
  body: { maxWidth: 1280, margin: "0 auto", padding: "28px 28px" },
  grid: { display: "flex", gap: 24, alignItems: "flex-start" },

  // sidebar
  sidebar: { width: 256, flexShrink: 0, position: "sticky", top: 80 },
  sidebarCard: {
    background: "#fff", border: "1.5px solid #e8edf5", borderRadius: 18,
    overflow: "hidden", boxShadow: "0 2px 16px rgba(30,58,138,.06)",
  },
  sidebarHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "15px 18px", borderBottom: "1.5px solid #f1f5f9", background: "#fafbff",
  },
  sidebarTitle: { fontWeight: 800, fontSize: 14.5, color: "#1e293b" },
  filterBadge: {
    background: "#dbeafe", color: "#1d4ed8",
    fontSize: 10.5, fontWeight: 800, padding: "2px 7px", borderRadius: 20,
  },
  clearBtn: {
    display: "inline-flex", alignItems: "center",
    background: "none", border: "none", color: "#94a3b8",
    fontSize: 12, fontWeight: 600, cursor: "pointer",
    padding: 0, fontFamily: "'Nunito', sans-serif",
  },
  sidebarBody: {
    padding: "18px 18px 6px",
    display: "flex", flexDirection: "column", gap: 18,
  },
  filterGroup: { display: "flex", flexDirection: "column", gap: 7 },
  filterLabel: {
    display: "flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 700, color: "#64748b",
    textTransform: "uppercase", letterSpacing: "0.07em",
  },
  tipBox: {
    margin: 16, display: "flex", alignItems: "flex-start", gap: 8,
    background: "#eff6ff", border: "1.5px solid #bfdbfe",
    borderRadius: 12, padding: "11px 14px",
  },

  // cards
  cardInner: { display: "flex", flexDirection: "row", gap: 22, padding: 22 },
  avatarCol: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 10, flexShrink: 0,
  },
  avatar: {
    width: 112, height: 112, borderRadius: 16, objectFit: "cover", display: "block",
    border: "3px solid #fff",
    boxShadow: "0 0 0 2px #dbeafe, 0 4px 16px rgba(29,78,216,.14)",
  },
  onlineBadge: {
    position: "absolute", bottom: -11, left: "50%", transform: "translateX(-50%)",
    display: "inline-flex", alignItems: "center",
    background: "#10b981", color: "#fff",
    fontSize: 10, fontWeight: 800, padding: "3px 9px",
    borderRadius: 20, whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(16,185,129,.35)", border: "2px solid #fff",
  },
  ratingPill: {
    display: "inline-flex", alignItems: "center", gap: 4,
    background: "#fef3c7", border: "1.5px solid #fde68a",
    padding: "4px 10px", borderRadius: 20,
  },
  docName: { fontSize: 20, fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.2 },
  docSpec: { fontSize: 13.5, fontWeight: 700, color: "#3b82f6", margin: "4px 0 0" },
  feeAmount: { fontSize: 20, fontWeight: 800, color: "#0f172a", margin: 0 },
  feeLabel: { fontSize: 11, color: "#94a3b8", margin: "2px 0 0", fontWeight: 500 },
  tag: {
    display: "inline-flex", alignItems: "center",
    fontSize: 11.5, fontWeight: 700, padding: "4px 10px",
    borderRadius: 20, border: "1.5px solid transparent",
  },
  metaGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "8px 16px", marginTop: 14,
  },
  metaItem: { display: "flex", alignItems: "center", gap: 8 },
  metaIconBox: {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 28, height: 28, borderRadius: 8,
    background: "#f8fafc", border: "1.5px solid #e8edf5", flexShrink: 0,
  },
  metaText: { fontSize: 13, color: "#475569", fontWeight: 500 },
  resultCount: { fontSize: 13, color: "#64748b", marginBottom: 16, fontWeight: 500 },
  emptyState: {
    background: "#fff", border: "1.5px solid #e8edf5",
    borderRadius: 18, padding: "60px 24px", textAlign: "center",
  },
};