import  { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// HealthBridge — Attractive Patient Signup Page (single-file React component)
// Tailwind CSS required.
// Uses inline SVGs for icons and a small password strength meter.

export default function PatientSignup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    phone: "",
    address: "",
    acceptTerms: false,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function handleAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function validate() {
    const err = {};
    if (!form.fullName.trim()) err.fullName = "Full name is required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) err.email = "Enter a valid email";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) err.confirmPassword = "Passwords do not match";
    if (!form.gender) err.gender = "Select gender";
    if (!form.age || Number(form.age) <= 0) err.age = "Enter a valid age";
    if (!form.acceptTerms) err.acceptTerms = "You must accept terms";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function passwordStrength(pwd) {
    let score = 0;
    if (!pwd) return { score, label: "Empty" };
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const label = score <= 1 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong";
    return { score, label };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // replace with API call
    console.log("Register patient:", form);
    alert("Signup successful (mock). Redirecting to login...");
    // redirect logic here
  }

  const strength = passwordStrength(form.password);
  const primary = "#3A59D1"; // HealthBridge primary color

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-12 gap-6 items-center">
        {/* Left hero */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="col-span-12 md:col-span-5 bg-gradient-to-tr from-[#eef4ff] to-[#f5fbff] rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#3A59D1" />
                    <path d="M4 20c0-3.31 4.03-6 8-6s8 2.69 8 6v1H4v-1z" fill="#3A59D1" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1F2937]">Welcome to HealthBridge</h3>
              </div>

              <p className="mt-4 text-sm text-[#6B7280]">Sign up to book appointments, consult doctors online, store medical records, and get reminders — all in one secure place.</p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow">✔</div>
                  <div>
                    <div className="font-medium">Fast booking</div>
                    <div className="text-sm text-[#6B7280]">Find and book doctors in a few clicks.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow">💬</div>
                  <div>
                    <div className="font-medium">Secure chat & video</div>
                    <div className="text-sm text-[#6B7280]">Private teleconsultations and messages.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow">📄</div>
                  <div>
                    <div className="font-medium">Records & Prescriptions</div>
                    <div className="text-sm text-[#6B7280]">Store your reports and prescriptions safely.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-6 text-xs text-[#6B7280]">
              <div className="mb-2">Already have an account?</div>
              <a href="/patient-login" className="inline-block bg-white px-4 py-2 rounded-lg shadow text-[#3A59D1] font-medium">Log in</a>
            </div>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="col-span-12 md:col-span-7 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1F2937]">Create your account</h2>
              <p className="text-sm text-[#6B7280] mt-1">Patient signup — quick and secure</p>
            </div>

            <div className="flex gap-3">
              <button className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-[#fbfbff]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12.3c0-.7-.1-1.3-.2-1.9H12v3.5h4.7c-.2 1-.7 1.8-1.5 2.4v2h2.5c1.5-1.4 2.4-3.6 2.4-6z" fill="#EA4335"/><path d="M12 22c2.7 0 4.9-.9 6.5-2.5l-2.5-2c-1 .7-2.2 1.1-4 1.1-3.1 0-5.7-2-6.6-4.7H3v2.9C4.5 19.7 8 22 12 22z" fill="#4285F4"/><path d="M5.4 13.9A7.9 7.9 0 0 1 5 12c0-.6.1-1.2.4-1.8V7.3H3v2.6C2.1 11.1 2 11.5 2 12c0 .5.1.9.3 1.3l2.1.6z" fill="#FBBC05"/></svg>
                <span className="text-sm">Sign up with Google</span>
              </button>
              <button className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-[#fbfbff]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 13.3c-.1-1.7.8-3.1 2.4-4.1-1.1-1.6-2.8-2.6-4.9-2.6-2.1 0-3.6 1.2-4.3 1.2s-2.1-1.1-3.5-1.1C4.9 6.7 3 8.7 3 11.8c0 1.4.5 2.8 1.5 3.7.9.9 2.3 1.6 4 1.6 1.6 0 2.3-.8 3.8-.8 1.6 0 2.6.8 3.9.8 1.2 0 2.5-.4 3.5-1.5-.4-1.9-1.8-3.1-3.6-3.1z" fill="#000"/></svg>
                <span className="text-sm">Apple</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Full Name</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} className={`mt-1 w-full p-3 rounded-lg border ${errors.fullName ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#3D90D7]`} placeholder="e.g. Ali Khan" />
                {errors.fullName && <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className={`mt-1 w-full p-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#3D90D7]`} placeholder="you@example.com" />
                {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Password</label>
                <div className="relative mt-1">
                  <input name="password" value={form.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} className={`w-full p-3 rounded-lg border ${errors.password ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#3D90D7]`} placeholder="Create a password" />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-3 text-sm text-[#6B7280]">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
                {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}

                {/* strength meter */}
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div style={{ width: `${(strength.score / 4) * 100}%` }} className={`h-2 rounded-full ${strength.score <= 1 ? 'bg-red-400' : strength.score === 2 ? 'bg-yellow-400' : strength.score === 3 ? 'bg-indigo-400' : 'bg-green-400'}`} />
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1">Strength: {strength.label}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Confirm Password</label>
                <div className="relative mt-1">
                  <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type={showConfirm ? 'text' : 'password'} className={`w-full p-3 rounded-lg border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#3D90D7]`} placeholder="Repeat password" />
                  <button type="button" onClick={() => setShowConfirm((s) => !s)} className="absolute right-3 top-3 text-sm text-[#6B7280]">{showConfirm ? 'Hide' : 'Show'}</button>
                </div>
                {errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className={`mt-1 w-full p-3 rounded-lg border ${errors.gender ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#3D90D7]`}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <div className="text-xs text-red-500 mt-1">{errors.gender}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Age</label>
                <input name="age" value={form.age} onChange={handleChange} type="number" className={`mt-1 w-full p-3 rounded-lg border ${errors.age ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#3D90D7]`} placeholder="e.g. 28" />
                {errors.age && <div className="text-xs text-red-500 mt-1">{errors.age}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3D90D7]" placeholder="0300-1234567" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6B7280]">Address (optional)</label>
              <textarea name="address" value={form.address} onChange={handleChange} className="mt-1 w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3D90D7] h-20" placeholder="Your city, street, etc."></textarea>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm font-medium text-[#6B7280] mb-2">Profile photo</div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 border flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#c7d2fe"/><path d="M4 20c0-3.31 4.03-6 8-6s8 2.69 8 6v1H4v-1z" fill="#c7d2fe"/></svg>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input ref={fileInputRef} onChange={handleAvatar} type="file" accept="image/*" className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-3 py-2 border rounded-lg">Upload</button>
                    {avatarPreview && <button type="button" onClick={() => { setAvatarPreview(null); fileInputRef.current.value = null; }} className="px-3 py-2 border rounded-lg">Remove</button>}
                  </div>
                </div>
              </div>

              <div className="flex-1 text-sm text-[#6B7280]">Uploading a photo makes it easier for doctors to recognize you during video calls. Photo is optional.</div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" name="acceptTerms" checked={form.acceptTerms} onChange={handleChange} id="terms" className="h-4 w-4" />
              <label htmlFor="terms" className="text-sm text-[#6B7280]">I agree to HealthBridge's <a href="#" className="text-[#3A59D1] underline">Terms & Privacy</a></label>
            </div>
            {errors.acceptTerms && <div className="text-xs text-red-500">{errors.acceptTerms}</div>}

            <div className="flex items-center justify-between gap-4">
              <button type="submit" className="flex-1 bg-[#3A59D1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#324ab0] transition">Create account</button>
              <Link to="/patient-login" className="text-sm text-[#6B7280]">Already registered? Log in</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
