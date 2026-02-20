import { useState, useEffect } from 'react';
import { Menu, X, Stethoscope, FlaskConical, User, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetBasicInfoQuery, useGetUserQuery } from '../../api/doctorApi';
import { useGetCurrentPatientQuery } from '../../api/patientApi';

// Mock Redux state


const DoctorCategoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const categories = [
    { name: "Cardiologist", icon: "❤️", count: 45 },
    { name: "Dermatologist", icon: "🧴", count: 32 },
    { name: "Neurologist", icon: "🧠", count: 28 },
    { name: "Pediatrician", icon: "👶", count: 51 },
    { name: "Orthopedic", icon: "🦴", count: 38 },
    { name: "Psychiatrist", icon: "🧘", count: 24 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 transform scale-100 transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Select Doctor Category</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all group"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-gray-800 group-hover:text-blue-700">{cat.name}</div>
              <div className="text-xs text-gray-500">{cat.count} doctors</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ name, image }) => {
  const initial = name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        initial
      )}
    </div>
  );
};

const Button = ({ variant, children, onClick, className = "" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-700 hover:bg-gray-100"
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};



export const Header = () => {
  const [currentUser, setCurrentUser] = useState({})
  const { data } = useGetBasicInfoQuery()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: userDetails } = useGetUserQuery()
  useEffect(() => {
    setCurrentUser(userDetails?.doctor)
  }, [userDetails])
  let path = "";
  if (currentUser?.isProfileComplete) {
    path = '/doctor/dashboard'
  } else {
    path = "/doctor"
  }

  const { data: currentPatient, isLoading } = useGetCurrentPatientQuery();
  const patient = currentPatient?.patient;
  const doctor = currentUser;
  const currentUsers = doctor || patient || null;
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg'
        : 'bg-white shadow-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Left: Logo and Desktop Navigation */}
            <div className="flex items-center space-x-8 lg:space-x-12">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                  HealthBridges
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                

                <Link
                  to="/laboratories"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all group"
                >
                  <FlaskConical size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">Laboratories</span>
                </Link>
              </nav>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center space-x-3">
              {!currentUsers ? (
                <>
                  {/* Desktop Buttons */}
                  <div className="hidden md:flex items-center space-x-3">
                    <Link to="/register-patient">
                      <Button variant="ghost" className="cursor-pointer flex items-center space-x-2">
                        <LogIn size={18} />
                        <span>Login</span>
                      </Button>
                    </Link>

                    <Link to="/join-doctor">
                      <Button variant="primary" className="cursor-pointer flex items-center space-x-2">
                        <UserPlus size={18} />
                        <span>Join as Doctor</span>
                      </Button>
                    </Link>
                  </div>

                  {/* Mobile Login Button */}
                  <Link to="/register-patient" className="md:hidden">
                    <Button variant="primary" className="!px-4">
                      <LogIn size={20} />
                    </Button>
                  </Link>
                </>
              ) : (
                <Link
                  to={
                    currentUsers.role === "doctor"
                      ? currentUsers?.isProfileComplete
                        ? "/doctor/dashboard"
                        : "/doctor"
                      : "/patient/dashboard/overview"
                  }
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all group"
                >
                  <Avatar
                    name={currentUsers?.name}
                    image={
                      currentUsers.role === "doctor"
                        ? data?.doctorInfo?.profileImageUrl
                        : currentUsers?.profileImageUrl
                    }
                  />
                  <span className="hidden sm:block font-medium text-gray-700 group-hover:text-blue-600">
                    {currentUsers?.name}
                  </span>
                </Link>
              )}


              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-2 animate-in slide-in-from-top cursor-pointer">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-all"
              >
                <Stethoscope size={20} className="text-blue-600" />
                <span className="font-medium text-gray-700">Doctors</span>
              </button>

              <Link
                to="/laboratories"
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-all"
              >
                <FlaskConical size={20} className="text-blue-600" />
                <span className="font-medium text-gray-700">Laboratories</span>
              </Link>

              {(!currentUser?.isActive || currentUser?.role !== "doctor") && (
                <div className="pt-4 space-y-2">
                  <Link to="/register-patient" className="block">
                    <Button variant="secondary" className="cursor-pointer w-full justify-center">
                      <LogIn size={18} className="mr-2" />
                      Login / Signup
                    </Button>
                  </Link>
                  <Link to="/join-doctor" className="block">
                    <Button variant="primary" className=" cursor-pointer w-full justify-center">
                      <UserPlus size={18} className="mr-2" />
                      Join as Doctor
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20"></div>


      <DoctorCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};