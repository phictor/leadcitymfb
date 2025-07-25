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
    content: "Lead City Microfinance Bank is proud to introduce our new digital banking platform, designed to provide seamless banking experiences for our valued customers. The platform features enhanced security protocols, intuitive user interfaces, and comprehensive banking functionalities including account management, fund transfers, bill payments, and loan applications.",
    category: "Technology",
    author: "Lead City MFB Team",
    publishDate: "2024-07-20",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "Agricultural Loan Program Expansion Supports Local Farmers",
    summary: "Our specialized agricultural financing program has been expanded to provide more comprehensive support for farmers across Oyo State.",
    content: "Lead City Microfinance Bank continues its commitment to supporting agricultural development in Oyo State through our expanded agricultural loan program. The initiative provides tailored financing solutions for farmers, including seasonal loans, equipment financing, and working capital support. With competitive interest rates and flexible repayment terms aligned with farming cycles, we're empowering local farmers to increase productivity and improve their livelihoods.",
    category: "Agriculture", 
    author: "Agricultural Division",
    publishDate: "2024-07-15",
    readTime: "4 min read",
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
    publishDate: "2024-07-10",
    readTime: "2 min read", 
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 4,
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
    id: 5,
    title: "Enhanced Security Measures for Customer Protection",
    summary: "We've implemented additional security protocols to ensure the safety of our customers' financial information and transactions.",
    content: "Customer security remains our top priority at Lead City Microfinance Bank. We've recently implemented enhanced security measures including advanced fraud detection systems, multi-factor authentication for digital transactions, and upgraded encryption protocols. These improvements ensure that our customers can bank with confidence, knowing their financial information and transactions are protected by industry-leading security standards.",
    category: "Security",
    author: "IT Security Team", 
    publishDate: "2024-06-30",
    readTime: "3 min read",
    image: "/api/placeholder/400/250",
    featured: false
  }
];

const categories = ["All", "Technology", "Agriculture", "Education", "Business", "Security"];

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