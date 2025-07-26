import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRODUCTS, LOAN_PRODUCTS } from "@/lib/constants";
import { PiggyBank, CreditCard, TrendingUp, User, Leaf } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  features: string;
  benefits: string;
  requirements: string;
  interestRate?: string;
  minimumAmount?: string;
  maximumAmount?: string;
  tenure?: string;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

const iconMap = {
  "piggy-bank": <PiggyBank className="w-8 h-8 text-brand-green" />,
  "credit-card": <CreditCard className="w-8 h-8 text-brand-green" />,
  "chart-line": <TrendingUp className="w-8 h-8 text-brand-green" />,
  "user": <User className="w-8 h-8 text-brand-green" />,
  "leaf": <Leaf className="w-8 h-8 text-brand-green" />,
};

export default function Products() {
  // Fetch products from database
  const { data: dbProducts = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  // Group products by category
  const groupedProducts = (dbProducts as Product[]).reduce((acc: Record<string, Product[]>, product: Product) => {
    if (product.isActive) {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
    }
    return acc;
  }, {});

  // Sort products within each category by sortOrder
  Object.keys(groupedProducts).forEach(category => {
    groupedProducts[category].sort((a, b) => a.sortOrder - b.sortOrder);
  });

  const parseFeatures = (features: string) => {
    try {
      return JSON.parse(features);
    } catch {
      return features.split(',').map(f => f.trim());
    }
  };

  const parseBenefits = (benefits: string) => {
    try {
      return JSON.parse(benefits);
    } catch {
      return benefits.split(',').map(b => b.trim());
    }
  };

  if (isLoading) {
    return <div className="pt-16 flex items-center justify-center h-64">Loading products...</div>;
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              Our Products & Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to meet the diverse needs of individuals and small businesses
            </p>
          </div>
        </div>
      </section>

      {/* Database Products by Category */}
      {Object.entries(groupedProducts).map(([category, products]) => {
        const categoryLabels: Record<string, string> = {
          'savings': 'Savings Accounts',
          'current': 'Current Accounts', 
          'fixed': 'Fixed Deposit Accounts',
          'loan': 'Loan Products',
          'investment': 'Investment Products',
          'insurance': 'Insurance Products'
        };

        const categoryDescriptions: Record<string, string> = {
          'savings': 'Secure your savings with our range of deposit accounts',
          'current': 'Flexible banking solutions for your daily transactions',
          'fixed': 'High-yield fixed deposit accounts for guaranteed returns',
          'loan': 'Access financing solutions tailored to your needs',
          'investment': 'Grow your wealth with our investment products',
          'insurance': 'Protect your assets with comprehensive insurance'
        };

        return (
          <section key={category} className={`py-20 ${category === 'loan' || category === 'insurance' ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">
                  {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <p className="text-xl text-gray-600">
                  {categoryDescriptions[category] || `Explore our ${category} offerings`}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card key={product.id} className="h-full hover:shadow-2xl transition-shadow border border-gray-100">
                    <CardHeader>
                      <div className="w-16 h-16 bg-light-green rounded-xl flex items-center justify-center mb-4">
                        {iconMap["piggy-bank"]}
                      </div>
                      <CardTitle className="text-xl font-semibold dark-green">{product.name}</CardTitle>
                      <CardDescription className="text-gray-600">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="font-medium text-dark-green mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {parseFeatures(product.features).slice(0, 4).map((feature: string, index: number) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-dark-green mb-2">Benefits:</h4>
                          <ul className="space-y-1">
                            {parseBenefits(product.benefits).slice(0, 3).map((benefit: string, index: number) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-2"></span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {(product.interestRate || product.minimumAmount || product.tenure) && (
                          <div className="bg-light-green p-4 rounded-lg">
                            <h4 className="font-medium text-dark-green mb-2">Product Details:</h4>
                            <div className="space-y-1 text-sm">
                              {product.interestRate && (
                                <p><span className="font-medium">Interest Rate:</span> {product.interestRate}</p>
                              )}
                              {product.minimumAmount && (
                                <p><span className="font-medium">Minimum Amount:</span> {product.minimumAmount}</p>
                              )}
                              {product.maximumAmount && (
                                <p><span className="font-medium">Maximum Amount:</span> {product.maximumAmount}</p>
                              )}
                              {product.tenure && (
                                <p><span className="font-medium">Tenure:</span> {product.tenure}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          className="w-full bg-brand-green hover:bg-dark-green text-white"
                          onClick={() => window.location.href = category === 'loan' ? "/loan-application" : "/account-opening"}
                        >
                          {category === 'loan' ? 'Apply for Loan' : 'Open Account'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Fallback to Constants if no DB products */}
      {Object.keys(groupedProducts).length === 0 && (
        <>
          {/* Deposit Products */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">Deposit Products</h2>
                <p className="text-xl text-gray-600">
                  Secure your savings with our range of deposit accounts
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
        </>
      )}

      {/* Loan Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">Loan Products</h2>
            <p className="text-xl text-gray-600">
              Access financing solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LOAN_PRODUCTS.map((loan) => (
              <Card key={loan.id} className="h-full hover:shadow-2xl transition-shadow border border-gray-100">
                <CardHeader>
                  <div className="w-16 h-16 bg-light-green rounded-xl flex items-center justify-center mb-4">
                    {iconMap[loan.icon as keyof typeof iconMap]}
                  </div>
                  <CardTitle className="text-xl font-semibold dark-green">{loan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{loan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum Amount:</span>
                      <span className="font-semibold">₦{loan.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-semibold">{loan.interestRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenure:</span>
                      <span className="font-semibold">{loan.tenure}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-brand-green rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/loan-application">
                    <Button className="w-full bg-brand-green hover:bg-dark-green text-white font-semibold">
                      Apply for {loan.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600">
              More ways we can help you achieve your financial goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Money Transfer",
                description: "Send and receive money safely across Nigeria and internationally",
                icon: "💸"
              },
              {
                title: "Bill Payments",
                description: "Pay your utility bills, airtime, and other services conveniently",
                icon: "💳"
              },
              {
                title: "Financial Advisory",
                description: "Get expert advice on investments and financial planning",
                icon: "📊"
              },
              {
                title: "Insurance Services",
                description: "Protect your assets with our comprehensive insurance products",
                icon: "🛡️"
              }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold dark-green mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
