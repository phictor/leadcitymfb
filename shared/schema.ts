import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const accountApplications = pgTable("account_applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  address: text("address").notNull(),
  idType: text("id_type").notNull(),
  idNumber: text("id_number").notNull(),
  accountType: text("account_type").notNull(),
  initialDeposit: integer("initial_deposit").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  businessAddress: text("business_address").notNull(),
  loanAmount: integer("loan_amount").notNull(),
  loanPurpose: text("loan_purpose").notNull(),
  monthlyIncome: integer("monthly_income").notNull(),
  monthlyExpenses: integer("monthly_expenses").notNull(),
  existingLoans: text("existing_loans"),
  collateralType: text("collateral_type"),
  collateralValue: integer("collateral_value"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  hours: text("hours").notNull(),
});

export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  publishDate: text("publish_date").notNull(),
  readTime: text("read_time").notNull(),
  featured: boolean("featured").default(false),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  pageId: text("page_id").notNull().unique(), // 'home', 'contact', 'branches', 'banking'
  title: text("title").notNull(),
  content: text("content").notNull(),
  metadata: text("metadata"), // JSON string for additional data
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pageContentSections = pgTable("page_content_sections", {
  id: serial("id").primaryKey(),
  pageId: text("page_id").notNull(), // 'home', 'contact', 'branches', 'banking'
  sectionType: text("section_type").notNull(), // 'hero', 'feature', 'testimonial', 'gallery', 'text', 'cta'
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  buttonText: text("button_text"),
  buttonLink: text("button_link"),
  orderIndex: integer("order_index").notNull().default(0),
  isVisible: boolean("is_visible").default(true),
  metadata: text("metadata"), // JSON for additional section-specific data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Homepage content management tables
export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  primaryButtonText: text("primary_button_text").notNull(),
  primaryButtonLink: text("primary_button_link").notNull(),
  secondaryButtonText: text("secondary_button_text"),
  secondaryButtonLink: text("secondary_button_link"),
  backgroundImage: text("background_image").notNull(),
  heroImage: text("hero_image"),
  backgroundColor: text("background_color").notNull(),
  statistic1Value: text("statistic1_value"),
  statistic1Label: text("statistic1_label"),
  statistic2Value: text("statistic2_value"),
  statistic2Label: text("statistic2_label"),
  statistic3Value: text("statistic3_value"),
  statistic3Label: text("statistic3_label"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productCards = pgTable("product_cards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").notNull(), // JSON string of features array
  buttonText: text("button_text").notNull(),
  buttonLink: text("button_link").notNull(),
  iconName: text("icon_name").notNull(), // Icon component name
  backgroundColor: text("background_color").notNull(),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("general"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertAccountApplicationSchema = createInsertSchema(accountApplications).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageContentSchema = createInsertSchema(pageContent).omit({
  id: true,
  updatedAt: true,
});

export const insertPageContentSectionSchema = createInsertSchema(pageContentSections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductCardSchema = createInsertSchema(productCards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFaqItemSchema = createInsertSchema(faqItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertAccountApplication = z.infer<typeof insertAccountApplicationSchema>;
export type AccountApplication = typeof accountApplications.$inferSelect;

export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;
export type LoanApplication = typeof loanApplications.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Branch = typeof branches.$inferSelect;

export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContent.$inferSelect;

export type InsertPageContentSection = z.infer<typeof insertPageContentSectionSchema>;
export type PageContentSection = typeof pageContentSections.$inferSelect;

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type HeroSlide = typeof heroSlides.$inferSelect;

export type InsertProductCard = z.infer<typeof insertProductCardSchema>;
export type ProductCard = typeof productCards.$inferSelect;

export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;
export type FaqItem = typeof faqItems.$inferSelect;

// Contact Information table
export const contactInfo = pgTable('contact_info', {
  id: serial('id').primaryKey(),
  sectionKey: text('section_key').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  metadata: text('metadata'), // JSON string for additional data
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Products/Services table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  features: text('features').notNull(), // JSON array
  benefits: text('benefits').notNull(), // JSON array
  requirements: text('requirements').notNull(), // JSON array
  interestRate: text('interest_rate'),
  minimumAmount: text('minimum_amount'),
  maximumAmount: text('maximum_amount'),
  tenure: text('tenure'),
  category: text('category').notNull(), // 'savings', 'current', 'loan', 'investment'
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Interest Rates & Charges table
export const rates = pgTable('rates', {
  id: serial('id').primaryKey(),
  productType: text('product_type').notNull(),
  rateType: text('rate_type').notNull(), // 'interest', 'charge', 'fee'
  value: text('value').notNull(),
  description: text('description').notNull(),
  effectiveDate: text('effective_date').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertRateSchema = createInsertSchema(rates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// About Sections table
export const aboutSections = pgTable('about_sections', {
  id: serial('id').primaryKey(),
  sectionType: text('section_type').notNull(), // 'mission', 'vision', 'values', 'history', 'team', 'achievement'
  title: text('title').notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  metadata: text('metadata'), // JSON for additional data
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertAboutSectionSchema = createInsertSchema(aboutSections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Team Members table
export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  bio: text('bio').notNull(),
  imageUrl: text('image_url'),
  linkedin: text('linkedin'),
  email: text('email'),
  department: text('department').notNull(),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Achievements table
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  year: text('year').notNull(),
  category: text('category').notNull(), // 'award', 'milestone', 'certification'
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Rate = typeof rates.$inferSelect;
export type InsertRate = z.infer<typeof insertRateSchema>;

export type AboutSection = typeof aboutSections.$inferSelect;
export type InsertAboutSection = z.infer<typeof insertAboutSectionSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
