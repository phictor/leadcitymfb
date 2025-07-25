import { createClient } from '@sanity/client'

// Sanity client configuration
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id', // Replace with your project ID
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2024-01-01',
})

// Helper function to build image URLs
export function urlForImage(source: any) {
  if (!source?.asset?._ref) {
    return null
  }
  
  const ref = source.asset._ref
  const [, id, extension] = ref.split('-')
  
  return `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${id}.${extension}`
}

// GROQ queries for fetching content
export const newsQueries = {
  // Get all articles
  allArticles: `*[_type == "newsArticle"] | order(publishDate desc) {
    _id,
    title,
    slug,
    summary,
    content,
    category,
    author,
    publishDate,
    readTime,
    featured,
    image
  }`,
  
  // Get featured article
  featuredArticle: `*[_type == "newsArticle" && featured == true][0] {
    _id,
    title,
    slug,
    summary,
    content,
    category,
    author,
    publishDate,
    readTime,
    featured,
    image
  }`,
  
  // Get articles by category
  articlesByCategory: (category: string) => `*[_type == "newsArticle" && category == "${category}"] | order(publishDate desc) {
    _id,
    title,
    slug,
    summary,
    content,
    category,
    author,
    publishDate,
    readTime,
    featured,
    image
  }`,
  
  // Get single article by slug
  articleBySlug: (slug: string) => `*[_type == "newsArticle" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    summary,
    content,
    category,
    author,
    publishDate,
    readTime,
    featured,
    image
  }`
}

// TypeScript interfaces for type safety
export interface NewsArticle {
  _id: string
  title: string
  slug: {
    current: string
  }
  summary: string
  content: string
  category: 'Technology' | 'Education' | 'Business' | 'Security'
  author: string
  publishDate: string
  readTime: string
  featured?: boolean
  image?: {
    asset: {
      _ref: string
    }
  }
}