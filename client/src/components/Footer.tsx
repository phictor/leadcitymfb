import { Link } from "wouter";
import { BANK_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10">
                <img 
                  src="/attached_assets/logo.jpg" 
                  alt="Lead City Microfinance Bank Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-3">
                <span className="text-white font-bold text-lg">Lead City</span>
                <div className="text-xs text-gray-300 uppercase tracking-wide">Microfinance Bank</div>
              </div>
            </div>
            <p className="text-gray-300">
              Your trusted partner for accessible and reliable microfinance services in Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-brand-green transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-brand-green transition-colors">Products & Services</Link></li>
              <li><Link href="/banking" className="text-gray-300 hover:text-brand-green transition-colors">Online Banking</Link></li>
              <li><Link href="/branches" className="text-gray-300 hover:text-brand-green transition-colors">Branch Locator</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-brand-green transition-colors">Savings Account</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green transition-colors">Current Account</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green transition-colors">Fixed Deposit</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green transition-colors">Business Loans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green transition-colors">Personal Loans</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-brand-green mr-2 mt-1"></i>
                <span className="text-gray-300 text-sm">
                  {BANK_INFO.address}
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-brand-green mr-2"></i>
                <span className="text-gray-300 text-sm">{BANK_INFO.phone}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-brand-green mr-2"></i>
                <span className="text-gray-300 text-sm">{BANK_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">
            &copy; 2024 Lead City Microfinance Bank. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-brand-green text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-brand-green text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-brand-green text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
