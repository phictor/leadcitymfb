import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Users, MapPin, Smartphone, Shield, Clock, Building2, CreditCard, PiggyBank, Banknote } from "lucide-react";
import { Link } from "wouter";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
    variant: "primary" | "secondary";
  };
  secondaryButton?: {
    text: string;
    link: string;
    variant: "primary" | "secondary";
  };
  stats?: {
    icon: any;
    value: string;
    label: string;
  }[];
  backgroundImage?: string;
  backgroundColor?: string;
  heroImage?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Banking Made Simple for You",
    subtitle: "Modern Microfinance Banking",
    description: "Experience modern microfinance banking with Lead City MFB. Open accounts, apply for loans, and manage your finances with ease.",
    primaryButton: {
      text: "Open Account Now",
      link: "/account-opening",
      variant: "primary"
    },
    secondaryButton: {
      text: "Apply for Loan",
      link: "/loan-application",
      variant: "secondary"
    },
    stats: [
      {
        icon: Users,
        value: "5000+",
        label: "Happy Customers"
      },
      {
        icon: Banknote,
        value: "₦2B+",
        label: "Loans Disbursed"
      },
      {
        icon: MapPin,
        value: "1",
        label: "Branch Location"
      }
    ],
    backgroundColor: "from-emerald-600 to-emerald-800",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Download Our Mobile App",
    subtitle: "Banking at Your Fingertips",
    description: "Manage your account, transfer funds, and pay bills anytime, anywhere with our secure mobile banking app.",
    primaryButton: {
      text: "Download App",
      link: "#",
      variant: "primary"
    },
    secondaryButton: {
      text: "Learn More",
      link: "/online-banking",
      variant: "secondary"
    },
    stats: [
      {
        icon: Smartphone,
        value: "24/7",
        label: "Mobile Access"
      },
      {
        icon: Shield,
        value: "100%",
        label: "Secure Banking"
      },
      {
        icon: Clock,
        value: "Instant",
        label: "Transactions"
      }
    ],
    backgroundColor: "from-orange-600 to-orange-700",
    heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Quick Loan Approval",
    subtitle: "Get Funds When You Need Them",
    description: "Apply for business or personal loans with fast approval process. Competitive rates and flexible repayment terms.",
    primaryButton: {
      text: "Apply Now",
      link: "/loan-application", 
      variant: "primary"
    },
    secondaryButton: {
      text: "Check Rates",
      link: "/products",
      variant: "secondary"
    },
    stats: [
      {
        icon: Clock,
        value: "24hrs",
        label: "Quick Approval"
      },
      {
        icon: Banknote,
        value: "5%",
        label: "Starting Rate"
      },
      {
        icon: Users,
        value: "1000+",
        label: "Loans Approved"
      }
    ],
    backgroundColor: "from-blue-600 to-blue-700",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Secure Your Future",
    subtitle: "Savings & Investment Plans",
    description: "Build wealth with our various savings products and investment opportunities. Start with as little as ₦1,000.",
    primaryButton: {
      text: "Start Saving",
      link: "/account-opening",
      variant: "primary"
    },
    secondaryButton: {
      text: "View Plans",
      link: "/products",
      variant: "secondary"
    },
    stats: [
      {
        icon: Banknote,
        value: "12%",
        label: "Annual Returns"
      },
      {
        icon: Shield,
        value: "NDIC",
        label: "Insured"
      },
      {
        icon: Users,
        value: "2000+",
        label: "Active Savers"
      }
    ],
    backgroundColor: "from-purple-600 to-purple-700",
    heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.backgroundColor} transition-all duration-700 ease-in-out`} />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
          {/* Text Content */}
          <div className="text-left">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
                {currentSlideData.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
                {currentSlideData.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.8s_forwards]">
              <Link href={currentSlideData.primaryButton.link}>
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg text-base"
                >
                  🏦 {currentSlideData.primaryButton.text}
                </Button>
              </Link>
              
              {currentSlideData.secondaryButton && (
                <Link href={currentSlideData.secondaryButton.link}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 font-semibold px-8 py-4 rounded-lg shadow-lg text-base"
                  >
                    💰 {currentSlideData.secondaryButton.text}
                  </Button>
                </Link>
              )}
            </div>

            {/* Statistics */}
            {currentSlideData.stats && (
              <div className="grid grid-cols-3 gap-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
                {currentSlideData.stats.map((stat, index) => (
                  <div key={index} className="text-left">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-white/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hero Image - Matching prototype */}
          <div className="hidden lg:flex justify-center items-center opacity-0 animate-[fadeInRight_0.8s_ease-out_0.6s_forwards]">
            <div className="relative w-full max-w-lg">
              {/* Hero Image */}
              {currentSlideData.heroImage && (
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={currentSlideData.heroImage}
                    alt={currentSlideData.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                {currentSlide === 0 && <Building2 className="w-8 h-8 text-emerald-700" />}
                {currentSlide === 1 && <Smartphone className="w-8 h-8 text-orange-700" />}
                {currentSlide === 2 && <CreditCard className="w-8 h-8 text-blue-700" />}
                {currentSlide === 3 && <PiggyBank className="w-8 h-8 text-purple-700" />}
              </div>
              
              {/* Quality Indicators */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span className="text-sm font-medium text-gray-800">NDIC Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Previous/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">
          {currentSlide + 1} / {heroSlides.length}
        </span>
      </div>
    </section>
  );
}