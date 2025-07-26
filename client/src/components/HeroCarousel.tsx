import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Users, DollarSign, MapPin, Smartphone, Shield, Clock, Building2, CreditCard, PiggyBank } from "lucide-react";
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
        icon: DollarSign,
        value: "₦2B+",
        label: "Loans Disbursed"
      },
      {
        icon: MapPin,
        value: "1",
        label: "Branch Location"
      }
    ],
    backgroundColor: "from-emerald-600 to-emerald-800"
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
    backgroundColor: "from-orange-600 to-orange-700"
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
        icon: DollarSign,
        value: "5%",
        label: "Starting Rate"
      },
      {
        icon: Users,
        value: "1000+",
        label: "Loans Approved"
      }
    ],
    backgroundColor: "from-blue-600 to-blue-700"
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
        icon: DollarSign,
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
    backgroundColor: "from-purple-600 to-purple-700"
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-4">
              <p className="text-white/90 text-lg font-medium mb-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                {currentSlideData.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
                {currentSlideData.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
                {currentSlideData.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.8s_forwards]">
              <Link href={currentSlideData.primaryButton.link}>
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold px-8 py-3 shadow-lg"
                >
                  {currentSlideData.primaryButton.text}
                </Button>
              </Link>
              
              {currentSlideData.secondaryButton && (
                <Link href={currentSlideData.secondaryButton.link}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-emerald-700 font-semibold px-8 py-3 shadow-lg"
                  >
                    {currentSlideData.secondaryButton.text}
                  </Button>
                </Link>
              )}
            </div>

            {/* Statistics */}
            {currentSlideData.stats && (
              <div className="grid grid-cols-3 gap-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
                {currentSlideData.stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-8 h-8 text-white/90" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/80 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Visual Element - Banking Icons */}
          <div className="hidden lg:flex justify-center items-center opacity-0 animate-[fadeInRight_0.8s_ease-out_0.6s_forwards]">
            <div className="relative w-80 h-80">
              {/* Central Banking Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {currentSlide === 0 && <Building2 className="w-16 h-16 text-white" />}
                {currentSlide === 1 && <Smartphone className="w-16 h-16 text-white" />}
                {currentSlide === 2 && <CreditCard className="w-16 h-16 text-white" />}
                {currentSlide === 3 && <PiggyBank className="w-16 h-16 text-white" />}
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-16 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-bounce">
                <DollarSign className="w-8 h-8 text-white/80" />
              </div>
              <div className="absolute top-16 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                <Shield className="w-6 h-6 text-white/80" />
              </div>
              <div className="absolute bottom-16 left-8 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Users className="w-7 h-7 text-white/80" />
              </div>
              <div className="absolute bottom-8 right-16 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
                <Clock className="w-5 h-5 text-white/80" />
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