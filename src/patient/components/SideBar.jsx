import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import ProfileCard from "../../doctor/components/profileCard/ProfileCard";

function SideBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  

  const isActive = (path) => location.pathname.includes(path);

  const toggleSidebar = () => setIsOpen(!isOpen);

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

        <nav className="mt-6 space-y-2">
          {[
            { name: "Overview", path: "overview" },
     
            
            { name: "Appointments", path: "appointment" },
      
            { name: "Messages", path: "message" },
            { name: "My Payments", path: "payment" },

            { name: "Settings", path: "setting" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-[#F1F5FF] transition ${
                isActive(item.path)
                  ? "bg-[#EEF2FF] border border-[#3A59D1]"
                  : ""
              }`}
            >
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Drawer */}
     
    </>
  );
}

export default SideBar;
