import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UserPlus, Coins } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-16 bg-gradient-to-br from-light-green to-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark-green leading-tight">
                Banking Made <span className="brand-green">Simple</span> for You
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience modern microfinance banking with Lead City MFB. Open accounts, apply for loans, and manage your finances with ease.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/account-opening">
                <Button className="bg-brand-green hover:bg-dark-green text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Open Account Now
                </Button>
              </Link>
              <Link href="/loan-application">
                <Button variant="outline" className="border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 text-lg font-semibold">
                  <Coins className="w-5 h-5 mr-2" />
                  Apply for Loan
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold dark-green">5000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold dark-green">₦2B+</div>
                <div className="text-sm text-gray-600">Loans Disbursed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold dark-green">1</div>
                <div className="text-sm text-gray-600">Branch Location</div>
              </div>
            </div>
          </div>

          <div className="lg:text-right">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern banking with Lead City MFB" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
