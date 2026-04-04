import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, Menu, LayoutDashboard, CalendarDays, CalendarCheck2, MessageSquare, Users, Wallet, Landmark, Settings, LogOut } from "lucide-react";
import ProfileCard from "../components/profileCard/ProfileCard";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserQuery, useLogoutDoctorMutation } from "../../api/doctorApi";

// ── Shared nav items (single source of truth) ──────────────────
const NAV_ITEMS = [
  { name: "Overview",               path: "dashboard",    icon: LayoutDashboard  },
  { name: "Appointments",           path: "appointments", icon: CalendarDays     },
  { name: "Confirmed Appointments", path: "cappointments",icon: CalendarCheck2   },
  { name: "Messages",               path: "message",      icon: MessageSquare    },
  { name: "Patients",               path: "patient",      icon: Users            },
  { name: "Earnings",               path: "earning",      icon: Wallet           },
  { name: "Bank Details",           path: "bank",         icon: Landmark         },
  { name: "Settings",               path: "setting",      icon: Settings         },
];

// ── Shared NavLink component ────────────────────────────────────
function NavLink({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
        ${active
          ? "bg-blue-50 text-blue-700 border border-blue-200"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
    >
      <Icon
        size={16}
        className={active ? "text-blue-600" : "text-slate-400"}
      />
      {item.name}
    </Link>
  );
}

// ── Main Component ──────────────────────────────────────────────
function DoctorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetUserQuery();
  const [Logout] = useLogoutDoctorMutation();

  const doctor = data?.doctor;
  const isActive = (path) => location.pathname.includes(path);

  async function handleLogout() {
    const response = await Logout().unwrap();
    if (response?.success) navigate("/");
  }

  return (
    <>
      {/* ── Mobile Top Bar ── */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between bg-white border-b border-slate-100 px-5 py-3.5 shadow-sm">
        <span className="text-lg font-extrabold text-blue-700 tracking-tight">
          HealthBridge
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col bg-white border border-slate-100 rounded-2xl shadow-sm p-4 h-fit sticky top-6 gap-4">

        <ProfileCard profile={doctor} />

        {doctor?.isProfileComplete && (
          <>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  active={isActive(item.path)}
                />
              ))}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-100 pt-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </>
        )}
      </aside>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-72 h-full bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <span className="text-base font-extrabold text-blue-700 tracking-tight">
                  HealthBridge
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Profile */}
              <div className="px-4 py-4 border-b border-slate-100">
                <ProfileCard profile={doctor} />
              </div>

              {/* Nav */}
              {doctor?.isProfileComplete ? (
                <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.path}
                      item={item}
                      active={isActive(item.path)}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </nav>
              ) : (
                <div className="flex-1 flex items-center justify-center px-6 text-center">
                  <p className="text-sm text-slate-400 font-medium">
                    Complete your profile to access the dashboard.
                  </p>
                </div>
              )}

              {/* Logout */}
              {doctor?.isProfileComplete && (
                <div className="px-4 py-4 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default DoctorSidebar;