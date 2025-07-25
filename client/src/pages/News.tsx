import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Tag, User } from "lucide-react";

// Sample news data - In production, this would come from your CMS or API
const newsArticles = [
  {
    id: 1,
    title: "Lead City MFB Launches New Digital Banking Platform",
    summary: "We're excited to announce the launch of our enhanced digital banking platform, offering customers 24/7 access to banking services with improved security features.",
    content: "Lead City Microfinance Bank is proud to introduce our new digital banking platform, designed to provide seamless banking experiences for our valued customers. The platform features enhanced security protocols, intuitive user interfaces, and comprehensive banking functionalities including account management, fund transfers, bill payments, and loan applications. The new platform also includes AI-powered chatbot support and biometric authentication for enhanced user experience.",
    category: "Technology",
    author: "Lead City MFB Team",
    publishDate: "2024-07-20",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "Mobile Banking App Achieves 50,000 Downloads",
    summary: "Our mobile banking application reaches a significant milestone, demonstrating growing customer adoption of digital banking solutions.",
    content: "Lead City Microfinance Bank's mobile banking app has achieved 50,000 downloads within six months of launch. The app offers comprehensive banking services including balance inquiries, fund transfers, bill payments, and loan applications. With a 4.8-star rating on app stores, customers appreciate the user-friendly interface and robust security features. The app utilizes fingerprint authentication and real-time transaction notifications to ensure secure banking on the go.",
    category: "Technology",
    author: "Digital Banking Team",
    publishDate: "2024-07-18",
    readTime: "2 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 3,
    title: "Financial Literacy Workshop Success at Lead City University",
    summary: "Over 200 students participated in our recent financial literacy workshop, learning essential money management and banking skills.",
    content: "Lead City Microfinance Bank successfully conducted a comprehensive financial literacy workshop at Lead City University, attended by over 200 students. The workshop covered essential topics including budgeting, saving strategies, understanding credit, digital banking security, and entrepreneurship financing. As part of our community engagement initiative, we're committed to empowering young people with financial knowledge to make informed decisions about their economic future.",
    category: "Education",
    author: "Community Relations",
    publishDate: "2024-07-16",
    readTime: "2 min read", 
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 4,
    title: "Youth Entrepreneurship Training Program Launched",
    summary: "New educational initiative targets young entrepreneurs with comprehensive business and financial training workshops.",
    content: "Lead City Microfinance Bank has launched a Youth Entrepreneurship Training Program designed specifically for aspiring young business owners aged 18-35. The program includes modules on business plan development, financial management, marketing strategies, and access to startup funding. Over 150 participants have enrolled in the first cohort, with plans to expand the program to other universities across Oyo State. The initiative aims to reduce youth unemployment by fostering entrepreneurial skills and providing access to microfinance opportunities.",
    category: "Education",
    author: "Training Department",
    publishDate: "2024-07-12",
    readTime: "4 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 5,
    title: "Women Entrepreneurs Summit: Empowering Female Business Leaders",
    summary: "Annual summit brings together successful women entrepreneurs to share insights and network with emerging female business owners.",
    content: "Lead City Microfinance Bank hosted its annual Women Entrepreneurs Summit, featuring keynote speakers, panel discussions, and networking sessions. The event attracted over 300 female entrepreneurs from across Nigeria, focusing on topics such as accessing business funding, scaling operations, and overcoming gender-specific challenges in business. The bank announced a special women-focused loan product with reduced interest rates and flexible repayment terms to support female-led businesses.",
    category: "Education",
    author: "Gender Inclusion Team",
    publishDate: "2024-07-08",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 6,
    title: "Small Business Support Initiative Launches",
    summary: "New program offers comprehensive support for small and medium enterprises including financing, training, and mentorship.",
    content: "Lead City Microfinance Bank is launching a comprehensive Small Business Support Initiative designed to empower entrepreneurs and SMEs in our community. The program offers access to flexible financing options, business development training, mentorship opportunities, and networking events. Our goal is to create an ecosystem that nurtures business growth and contributes to local economic development.",
    category: "Business",
    author: "Business Development Team",
    publishDate: "2024-07-05",
    readTime: "5 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 7,
    title: "Partnership with Local Trade Associations Expands Business Network",
    summary: "Strategic partnerships with trade associations provide enhanced business support and networking opportunities for SME customers.",
    content: "Lead City Microfinance Bank has formed strategic partnerships with five major trade associations in Oyo State, including the Manufacturers Association, Traders Union, and Technology Hub Network. These partnerships provide our business customers with access to expanded markets, procurement opportunities, and professional development resources. The collaboration includes joint workshops, trade fairs, and mentorship programs designed to accelerate business growth and foster innovation in the local economy.",
    category: "Business",
    author: "Partnership Team",
    publishDate: "2024-06-28",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 8,
    title: "Digital Payment Solutions Drive Cashless Economy",
    summary: "Lead City MFB's digital payment platform processes over ₦2 billion in transactions, supporting Nigeria's cashless policy.",
    content: "Lead City Microfinance Bank's digital payment solutions have processed over ₦2 billion in transactions since launch, contributing significantly to Nigeria's cashless economy initiative. The platform supports POS services, online payments, and peer-to-peer transfers. With a network of over 500 POS agents across Oyo State, the bank is bridging the gap between urban and rural financial inclusion. The service has reduced transaction costs for businesses and improved financial accessibility for underserved communities.",
    category: "Business",
    author: "Payment Systems Team",
    publishDate: "2024-06-25",
    readTime: "4 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 9,
    title: "Enhanced Security Measures for Customer Protection",
    summary: "We've implemented additional security protocols to ensure the safety of our customers' financial information and transactions.",
    content: "Customer security remains our top priority at Lead City Microfinance Bank. We've recently implemented enhanced security measures including advanced fraud detection systems, multi-factor authentication for digital transactions, and upgraded encryption protocols. These improvements ensure that our customers can bank with confidence, knowing their financial information and transactions are protected by industry-leading security standards.",
    category: "Security",
    author: "IT Security Team", 
    publishDate: "2024-06-30",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 10,
    title: "Cybersecurity Awareness Campaign Protects Customers",
    summary: "Comprehensive cybersecurity education program helps customers identify and prevent digital fraud attempts.",
    content: "Lead City Microfinance Bank has launched a comprehensive cybersecurity awareness campaign to educate customers about digital fraud prevention. The campaign includes SMS alerts, email newsletters, and in-branch workshops covering topics such as phishing recognition, password security, and safe online banking practices. The initiative has resulted in a 40% reduction in successful fraud attempts against our customers. The bank also provides 24/7 fraud monitoring and immediate account protection services.",
    category: "Security",
    author: "Cybersecurity Team",
    publishDate: "2024-06-20",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 11,
    title: "Biometric Authentication System Enhances Account Security",
    summary: "Implementation of fingerprint and facial recognition technology provides additional security layers for customer accounts.",
    content: "Lead City Microfinance Bank has introduced biometric authentication systems across all digital platforms, including mobile apps and online banking. The system uses fingerprint and facial recognition technology to verify customer identities, providing an additional security layer beyond traditional passwords. This technology reduces the risk of unauthorized account access and ensures that only account holders can perform sensitive transactions. The system is compliant with international security standards and provides customers with peace of mind.",
    category: "Security",
    author: "Authentication Systems Team",
    publishDate: "2024-06-15",
    readTime: "4 min read",
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 12,
    title: "AI-Powered Fraud Detection System Prevents ₦50M in Losses",
    summary: "Advanced artificial intelligence system successfully identifies and prevents fraudulent transactions before they impact customers.",
    content: "Lead City Microfinance Bank's newly implemented AI-powered fraud detection system has prevented over ₦50 million in potential losses within its first quarter of operation. The system analyzes transaction patterns in real-time, identifying suspicious activities and automatically blocking potentially fraudulent transactions. The AI system learns from each interaction, continuously improving its accuracy and reducing false positives. This technology represents our commitment to protecting customer assets while maintaining seamless banking experiences.",
    category: "Technology",
    author: "AI Development Team",
    publishDate: "2024-06-10",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: false
  }
];

const categories = ["All", "Technology", "Education", "Business", "Security"];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const filteredArticles = selectedCategory === "All" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              News & Updates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest developments, announcements, and insights from Lead City Microfinance Bank
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold dark-green mb-8">Featured Story</h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-500">Featured Image</div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary" className="bg-brand-green text-white">
                      {featuredArticle.category}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredArticle.publishDate).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold dark-green mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredArticle.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {featuredArticle.author}
                    </div>
                    <Button 
                      onClick={() => setSelectedArticle(featuredArticle.id)}
                      className="bg-brand-green hover:bg-dark-green"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-brand-green hover:bg-dark-green" 
                  : "border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                }
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter(article => !article.featured).map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500">Article Image</div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-light-green text-dark-green">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg dark-green line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(article.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedArticle(article.id)}
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                  >
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal/Expanded View */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {(() => {
                const article = newsArticles.find(a => a.id === selectedArticle);
                if (!article) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <Badge variant="secondary" className="bg-brand-green text-white">
                        {article.category}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedArticle(null)}
                      >
                        Close
                      </Button>
                    </div>
                    <h1 className="text-3xl font-bold dark-green mb-4">{article.title}</h1>
                    <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-gray-500">Article Image</div>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-lg text-gray-700 leading-relaxed">{article.content}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}