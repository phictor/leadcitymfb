import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import { PRODUCTS, LOAN_PRODUCTS } from "@/lib/constants";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PiggyBank, CreditCard, TrendingUp, Smartphone, Shield, Clock, Download } from "lucide-react";

const iconMap = {
  "piggy-bank": <PiggyBank className="w-8 h-8 text-brand-green" />,
  "credit-card": <CreditCard className="w-8 h-8 text-brand-green" />,
  "chart-line": <TrendingUp className="w-8 h-8 text-brand-green" />,
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Products & Services Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">Our Products & Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed for individuals and small businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                features={product.features}
                icon={iconMap[product.icon as keyof typeof iconMap]}
                onApply={() => window.location.href = "/account-opening"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Online Banking Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold dark-green">
                  Bank Anywhere, Anytime
                </h2>
                <p className="text-xl text-gray-600">
                  Experience seamless digital banking with our online platform and mobile app.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark-green mb-2">Mobile Banking App</h3>
                    <p className="text-gray-600">Manage your accounts, transfer funds, and pay bills on the go.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark-green mb-2">Secure Transactions</h3>
                    <p className="text-gray-600">Bank-level security with two-factor authentication and encryption.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark-green mb-2">24/7 Access</h3>
                    <p className="text-gray-600">Access your accounts and perform transactions round the clock.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/banking">
                  <Button className="bg-brand-green hover:bg-dark-green text-white px-6 py-3 font-semibold">
                    Login to Internet Banking
                  </Button>
                </Link>
                <div className="flex space-x-3">
                  <a href="#" className="inline-block">
                    <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <div>
                        <div className="text-xs">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="inline-block">
                    <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <div>
                        <div className="text-xs">Get it on</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                <div className="bg-brand-green rounded-xl p-4 mb-4">
                  <div className="text-white text-lg font-semibold mb-2">Account Balance</div>
                  <div className="text-white text-3xl font-bold">₦1,248,500.00</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-brand-green text-lg">+</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Credit Alert</div>
                        <div className="text-xs text-gray-600">Today, 2:30 PM</div>
                      </div>
                    </div>
                    <div className="text-brand-green font-semibold">+₦25,000</div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-brand-orange text-lg">-</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Transfer</div>
                        <div className="text-xs text-gray-600">Yesterday, 4:15 PM</div>
                      </div>
                    </div>
                    <div className="text-brand-orange font-semibold">-₦10,000</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="bg-light-green text-brand-green py-2 rounded-lg font-semibold text-sm">Transfer</button>
                  <button className="bg-light-green text-brand-green py-2 rounded-lg font-semibold text-sm">Pay Bills</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
