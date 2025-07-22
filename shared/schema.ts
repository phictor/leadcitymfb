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
