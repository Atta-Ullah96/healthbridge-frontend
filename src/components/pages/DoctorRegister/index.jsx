import { useState } from "react";
import {
  User, Mail, Lock, Eye, EyeOff, Stethoscope,
  CheckCircle, AlertCircle, Shield, Award, ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLoginMutation, useRegisterDoctorMutation } from "../../../api/doctorApi";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const [registerDoctor, { isLoading }] = useRegisterDoctorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    if (!agreedToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const res = await registerDoctor(formData).unwrap();
      
      navigate("/doctor", { replace: true })

    } catch (err) {
      /**
       * Backend validation errors (Zod)
       */
      if (err?.data?.errors) {
        setFieldErrors(err.data.errors);
        return;
      }

      /**
       * Generic backend error
       */
      if (err?.data?.message) {
        alert(err.data.message);
        return;
      }

      /**
       * Network / unknown error
       */
      alert("Something went wrong. Please try again.");
    }
  };

   const [googleLogin, {  error }] = useGoogleLoginMutation();
   const handleSuccess = async (response) => {
     try {
       // The 'credential' is the JWT from Google
       const result = await googleLogin(response.credential).unwrap();
       console.log('Backend Response:', result);
       if(result.success){
         navigate('/doctor');
       }
       // Logic: Save user to Redux state or Redirect to Dashboard
     } catch (err) {
       console.error('Failed to authenticate with backend:', err);
     }
   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Stethoscope size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Join HealthBridge
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Register as a verified doctor and start providing exceptional healthcare to patients
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Verified Profile</h3>
                <p className="text-sm text-gray-600">Get your professional badge and build trust with patients</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Award size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Grow Your Practice</h3>
                <p className="text-sm text-gray-600">Connect with patients and manage appointments seamlessly</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <Shield size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure & Private</h3>
                <p className="text-sm text-gray-600">HIPAA compliant platform protecting your data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Stethoscope size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Doctor Registration</h2>
                  <p className="text-blue-100 text-sm">Create your professional account</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              <div>
                <p className="text-gray-600 text-center mb-6">
                  Join our network of healthcare professionals
                </p>
              </div>

              {/* Google Register Button */}
               <div className="flex justify-center">

                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log('Login Failed')}
                   
                    useOneTap
                  />
                </GoogleOAuthProvider>
              </div>


              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or register with email</span>
                </div>
              </div>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dr. John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="doctor@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password (min. 8 characters)"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                      I agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Register Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong className="font-semibold">Next Steps:</strong> After registration, you'll need to complete your profile and upload verification documents for PMC certification.
                </p>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/join-doctor" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Benefits */}
          <div className="lg:hidden mt-6 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Get Verified Professional Badge</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <Shield size={20} className="text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Secure & HIPAA Compliant</span>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;