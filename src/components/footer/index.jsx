
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#3A59D1] to-[#4E8DF5] text-white pt-16 pb-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold">HealthBridge</h2>
          <p className="mt-4 text-sm text-gray-200 leading-relaxed">
            Connecting patients with trusted doctors for better healthcare
            experiences anytime, anywhere.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-100 text-sm">
            <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300 transition">About Us</Link></li>
            <li><Link to="/doctors" className="hover:text-yellow-300 transition">Find a Doctor</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-100 text-sm">
            <li><Link href="/faq" className="hover:text-yellow-300 transition">FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-300 transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</Link></li>
            <li><Link to="/help" className="hover:text-yellow-300 transition">Help Center</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-200 mb-3">
            Subscribe to our newsletter for health tips & updates.
          </p>
          <div className="flex bg-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 text-black w-full outline-none"
            />
            <button className="bg-yellow-400 p-3 flex items-center justify-center hover:bg-yellow-500 transition">
              <FiSend className="text-black w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center space-x-5">
        <a href="https://www.facebook.com/profile.php?id=61577765708766" className="bg-white text-blue-600 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition">
          <FaFacebookF size={20} />
        </a>
        <a href="https://x.com/Atta_Ullah92" className="bg-white text-blue-400 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition">
          <FaTwitter size={20} />
        </a>
        <a href="https://www.instagram.com/atta_ullah96" className="bg-white text-pink-500 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.linkedin.com/in/atta-ullah-291725253" className="bg-white text-blue-700 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition">
          <FaLinkedinIn size={20} />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-white/30 pt-4 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} HealthBridge. All rights reserved.
      </div>
    </footer>
  );
}
