import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/banking", label: "Online Banking" },
    { href: "/branches", label: "Branches" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10">
                <img 
                  src="/attached_assets/logo.jpg" 
                  alt="Lead City Microfinance Bank Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-3">
                <span className="dark-green font-bold text-lg">Lead City</span>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Microfinance Bank</div>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-brand-green"
                      : "text-gray-600 hover:text-brand-green"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/account-opening">
              <Button className="bg-brand-green hover:bg-dark-green">
                Open Account
              </Button>
            </Link>
            <Link href="/banking">
              <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold dark-green">Menu</h3>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          location === link.href
                            ? "bg-green-50 text-brand-green border-l-4 border-brand-green"
                            : "text-gray-600 hover:text-brand-green hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col space-y-3">
                      <Link href="/account-opening" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-brand-green hover:bg-dark-green text-white py-3">
                          Open Account
                        </Button>
                      </Link>
                      <Link href="/banking" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white py-3">
                          Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
