import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PatientLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Login Data:", formData);
    // API call to authenticate patient
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#3A59D1] mb-2 text-center">
          Patient Login
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Please log in to continue.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#3A59D1] transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#3A59D1] transition"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-[#3A59D1]"
              />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-[#3A59D1] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#3A59D1] text-white p-3 rounded-lg font-medium hover:bg-[#2f47a0] transition"
          >
            Log In
          </motion.button>
        </form>

        {/* Redirect to Signup */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register-patient" className="text-[#3A59D1] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
