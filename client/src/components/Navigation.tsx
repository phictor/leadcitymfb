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
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">7</span>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-orange rounded-full"></div>
                </div>
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
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 text-base font-medium ${
                        location === link.href
                          ? "text-brand-green"
                          : "text-gray-600 hover:text-brand-green"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 px-3 py-2">
                    <Link href="/account-opening" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-brand-green hover:bg-dark-green">
                        Open Account
                      </Button>
                    </Link>
                    <Link href="/banking" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                        Login
                      </Button>
                    </Link>
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
