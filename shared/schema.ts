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
