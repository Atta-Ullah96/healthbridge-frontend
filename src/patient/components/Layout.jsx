import { motion } from "framer-motion";

import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

export default function PatientLayout() {
  const location = useLocation(); // 👈 Get current route

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] p-6">
      <div className="max-w-[1300px] mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <SideBar />

        {/* Main content */}
        <main className="col-span-9">
          <motion.div
            key={location.pathname} // 👈 use route path as unique key
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px]"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
