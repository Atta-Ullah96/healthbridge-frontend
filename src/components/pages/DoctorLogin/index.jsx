import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, Stethoscope,
  Shield, CheckCircle, AlertCircle, ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery, useGoogleLoginMutation, useLoginDoctorMutation } from "../../../api/doctorApi";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const JoinAsaDoctor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});


  const navigate = useNavigate();
  const [loginDoctor, { isLoading }] = useLoginDoctorMutation();
  const { data } = useGetUserQuery()



  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const response = await loginDoctor({ email, password }).unwrap();
      // response should have { user: {...}, token: '...' }

      // dispatch(setCredentials({ user: data }));

      // redirect depending on profile status
      if (data?.doctor?.isProfileComplete) navigate('/doctor/dashboard');

      navigate('/doctor');

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
        toast.error(err.data.message);
        return;
      }

      /**
       * Network / unknown error
       */
      toast.error("Something went wrong. Please try again.");
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
              Welcome Back,<br />Doctor
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Continue providing exceptional healthcare to your patients through our secure platform
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Access</h3>
                <p className="text-sm text-gray-600">Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Shield size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
                <p className="text-sm text-gray-600">HIPAA compliant platform ensuring patient confidentiality</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <Stethoscope size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Complete Dashboard</h3>
                <p className="text-sm text-gray-600">Manage appointments, patients, and earnings in one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Stethoscope size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Doctor Login</h2>
                  <p className="text-blue-100 text-sm">Access your dashboard</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              <div>
                <p className="text-gray-600 text-center mb-6">
                  Welcome back! Please enter your credentials to continue
                </p>
              </div>

              {/* Google Login Button */}
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
                  <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 transition">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium transition">
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className=" cursor-pointer w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to HealthBridge?</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  Join our network of healthcare professionals
                </p>
                <Link
                  to="/register-doctor"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-200"
                >
                  Register as a Doctor
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-6 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Secure & HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <Shield size={20} className="text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Privacy Protected Platform</span>
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

export default JoinAsaDoctor;