import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileCard from "../components/profileCard/ProfileCard";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserQuery, useLogoutDoctorMutation } from "../../api/doctorApi";

function DoctorSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetUserQuery()
  const navigate = useNavigate()

  const [Logout] = useLogoutDoctorMutation()

  const isActive = (path) => location.pathname.includes(path);

  const toggleSidebar = () => setIsOpen(!isOpen);

  async function logout(){
     const response = await Logout().unwrap()

    if(response?.success){
      navigate("/")
    }
  
    }
  return (
    <>
      {/* Mobile Navbar Icon */}
      <div className="lg:hidden flex items-center justify-between bg-white px-4 py-3 shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-semibold text-[#3A59D1]">HealthBridge</h1>
        <button
          onClick={toggleSidebar}
          className="text-[#3A59D1] text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:block col-span-3 bg-white rounded-2xl shadow-lg p-4 h-fit sticky top-6">
        <ProfileCard profile={data?.doctor} />
        {
          data?.doctor?.isProfileComplete ? (

            <nav className="mt-6 space-y-2">
              {[
                { name: "Overview", path: "dashboard" },

                { name: "Appointments", path: "appointments" },
                { name: "ConfirmedAppointments", path: "cappointments" },
                { name: "Messages", path: "message" },
                { name: "Patients", path: "patient" },
                { name: "Earnings", path: "earning" },
                { name: "Add Bank Details", path: "bank" },

                { name: "Settings", path: "setting" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-[#F1F5FF] transition ${isActive(item.path)
                    ? "bg-[#EEF2FF] border border-[#3A59D1]"
                    : ""
                    }`}
                >
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <button onClick={logout} className="cursor-pointer block w-full text-left px-4 py-2 rounded-lg hover:bg-[#F1F5FF] transition  border border-red-900 ">Logout</button>
            </nav>
          ) :
            ""
        }


      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar Drawer */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-50 p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#3A59D1]">
                  Doctor Panel
                </h2>
                <button
                  onClick={toggleSidebar}
                  className="text-[#3A59D1] text-xl focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>

              <ProfileCard profile={profile} />
              {
                user?.isProfileComplete ? (
                  <nav className="mt-6 space-y-2">
                    {[
                      { name: "Overview", path: "dashboard" },
                      { name: "Appointments", path: "appointments" },
                      { name: "Messages", path: "message" },
                      { name: "Patients", path: "patient" },
                      { name: "Earnings", path: "earning" },
                      { name: "Profile & Availability", path: "availability" },
                      { name: "Settings", path: "setting" },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={toggleSidebar}
                        className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-[#F1F5FF] transition ${isActive(item.path)
                          ? "bg-[#EEF2FF] border border-[#3A59D1]"
                          : ""
                          }`}
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                ) : ""
              }


            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default DoctorSidebar;
