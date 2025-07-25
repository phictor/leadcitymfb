import { useQuery } from '@tanstack/react-query'
import { sanityClient, newsQueries, type NewsArticle } from '@/lib/sanity'

// Hook to fetch all news articles
export function useNewsArticles() {
  return useQuery({
    queryKey: ['news-articles'],
    queryFn: async (): Promise<NewsArticle[]> => {
      try {
        const articles = await sanityClient.fetch(newsQueries.allArticles)
        return articles || []
      } catch (error) {
        console.error('Error fetching articles from Sanity:', error)
        // Fallback to local data if Sanity is not configured
        return fallbackArticles
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch featured article
export function useFeaturedArticle() {
  return useQuery({
    queryKey: ['featured-article'],
    queryFn: async (): Promise<NewsArticle | null> => {
      try {
        const article = await sanityClient.fetch(newsQueries.featuredArticle)
        return article || null
      } catch (error) {
        console.error('Error fetching featured article from Sanity:', error)
        // Return first featured article from fallback data
        return fallbackArticles.find(article => article.featured) || null
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch articles by category
export function useArticlesByCategory(category: string) {
  return useQuery({
    queryKey: ['news-articles', category],
    queryFn: async (): Promise<NewsArticle[]> => {
      try {
        if (category === 'All') {
          const articles = await sanityClient.fetch(newsQueries.allArticles)
          return articles || []
        }
        const articles = await sanityClient.fetch(newsQueries.articlesByCategory(category))
        return articles || []
      } catch (error) {
        console.error('Error fetching articles by category from Sanity:', error)
        // Fallback to filtered local data
        if (category === 'All') {
          return fallbackArticles
        }
        return fallbackArticles.filter(article => article.category === category)
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Fallback data when Sanity is not available or configured
const fallbackArticles: NewsArticle[] = [
  {
    _id: '1',
    title: "Lead City MFB Launches New Digital Banking Platform",
    slug: { current: 'digital-banking-platform-launch' },
    summary: "We're excited to announce the launch of our enhanced digital banking platform, offering customers 24/7 access to banking services with improved security features.",
    content: "Lead City Microfinance Bank is proud to introduce our new digital banking platform, designed to provide seamless banking experiences for our valued customers. The platform features enhanced security protocols, intuitive user interfaces, and comprehensive banking functionalities including account management, fund transfers, bill payments, and loan applications. The new platform also includes AI-powered chatbot support and biometric authentication for enhanced user experience.",
    category: "Technology",
    author: "Lead City MFB Team",
    publishDate: "2024-07-20",
    readTime: "3 min read",
    featured: true
  },
  {
    _id: '2',
    title: "Mobile Banking App Achieves 50,000 Downloads",
    slug: { current: 'mobile-app-milestone' },
    summary: "Our mobile banking application reaches a significant milestone, demonstrating growing customer adoption of digital banking solutions.",
    content: "Lead City Microfinance Bank's mobile banking app has achieved 50,000 downloads within six months of launch. The app offers comprehensive banking services including balance inquiries, fund transfers, bill payments, and loan applications. With a 4.8-star rating on app stores, customers appreciate the user-friendly interface and robust security features. The app utilizes fingerprint authentication and real-time transaction notifications to ensure secure banking on the go.",
    category: "Technology",
    author: "Digital Banking Team",
    publishDate: "2024-07-18",
    readTime: "2 min read",
    featured: false
  },
  {
    _id: '3',
    title: "Financial Literacy Workshop Success at Lead City University",
    slug: { current: 'financial-literacy-workshop' },
    summary: "Over 200 students participated in our recent financial literacy workshop, learning essential money management and banking skills.",
    content: "Lead City Microfinance Bank successfully conducted a comprehensive financial literacy workshop at Lead City University, attended by over 200 students. The workshop covered essential topics including budgeting, saving strategies, understanding credit, digital banking security, and entrepreneurship financing. As part of our community engagement initiative, we're committed to empowering young people with financial knowledge to make informed decisions about their economic future.",
    category: "Education",
    author: "Community Relations",
    publishDate: "2024-07-16",
    readTime: "2 min read",
    featured: false
  },
  {
    _id: '4',
    title: "Enhanced Security Measures for Customer Protection",
    slug: { current: 'enhanced-security-measures' },
    summary: "We've implemented additional security protocols to ensure the safety of our customers' financial information and transactions.",
    content: "Customer security remains our top priority at Lead City Microfinance Bank. We've recently implemented enhanced security measures including advanced fraud detection systems, multi-factor authentication for digital transactions, and upgraded encryption protocols. These improvements ensure that our customers can bank with confidence, knowing their financial information and transactions are protected by industry-leading security standards.",
    category: "Security",
    author: "IT Security Team",
    publishDate: "2024-06-30",
    readTime: "3 min read",
    featured: false
  }
]