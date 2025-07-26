import { 
  users, 
  accountApplications, 
  loanApplications, 
  contactMessages, 
  branches,
  newsArticles,
  pageContent,
  pageContentSections,
  adminUsers,
  type User, 
  type InsertUser,
  type AccountApplication,
  type InsertAccountApplication,
  type LoanApplication,
  type InsertLoanApplication,
  type ContactMessage,
  type InsertContactMessage,
  type Branch,
  type NewsArticle,
  type InsertNewsArticle,
  type PageContent,
  type InsertPageContent,
  type PageContentSection,
  type InsertPageContentSection,
  type AdminUser,
  type InsertAdminUser
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Account applications
  createAccountApplication(application: InsertAccountApplication): Promise<AccountApplication>;
  getAccountApplications(): Promise<AccountApplication[]>;
  getAccountApplication(id: number): Promise<AccountApplication | undefined>;
  
  // Loan applications
  createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication>;
  getLoanApplications(): Promise<LoanApplication[]>;
  getLoanApplication(id: number): Promise<LoanApplication | undefined>;
  
  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Branches
  getBranches(): Promise<Branch[]>;
  getBranch(id: number): Promise<Branch | undefined>;
  
  // News articles
  getNewsArticles(category?: string): Promise<NewsArticle[]>;
  getFeaturedNewsArticle(): Promise<NewsArticle | null>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  updateNewsArticle(id: number, article: InsertNewsArticle): Promise<NewsArticle>;
  deleteNewsArticle(id: number): Promise<void>;
  
  // Page content
  getPageContent(pageId: string): Promise<PageContent | null>;
  updatePageContent(pageId: string, content: InsertPageContent): Promise<PageContent>;
  
  // Page content sections
  getPageContentSections(pageId: string): Promise<PageContentSection[]>;
  createPageContentSection(section: InsertPageContentSection): Promise<PageContentSection>;
  updatePageContentSection(id: number, section: InsertPageContentSection): Promise<PageContentSection>;
  deletePageContentSection(id: number): Promise<void>;
  
  // Admin users
  getAdminUser(username: string): Promise<AdminUser | null>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  private checkDbConnection() {
    if (!db) {
      throw new Error("Database connection not available. Please set DATABASE_URL environment variable.");
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    this.checkDbConnection();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    this.checkDbConnection();
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    this.checkDbConnection();
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createAccountApplication(application: InsertAccountApplication): Promise<AccountApplication> {
    this.checkDbConnection();
    const [accountApplication] = await db
      .insert(accountApplications)
      .values(application)
      .returning();
    return accountApplication;
  }

  async getAccountApplications(): Promise<AccountApplication[]> {
    this.checkDbConnection();
    return await db.select().from(accountApplications);
  }

  async getAccountApplication(id: number): Promise<AccountApplication | undefined> {
    this.checkDbConnection();
    const [application] = await db.select().from(accountApplications).where(eq(accountApplications.id, id));
    return application || undefined;
  }

  async createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication> {
    this.checkDbConnection();
    const [loanApplication] = await db
      .insert(loanApplications)
      .values(application)
      .returning();
    return loanApplication;
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    this.checkDbConnection();
    return await db.select().from(loanApplications);
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    this.checkDbConnection();
    const [application] = await db.select().from(loanApplications).where(eq(loanApplications.id, id));
    return application || undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    this.checkDbConnection();
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    this.checkDbConnection();
    return await db.select().from(contactMessages);
  }

  async getBranches(): Promise<Branch[]> {
    this.checkDbConnection();
    let branchList = await db.select().from(branches);
    
    // If no branches exist, create the default Lead City University branch
    if (branchList.length === 0) {
      const [newBranch] = await db
        .insert(branches)
        .values({
          name: "Lead City University Branch",
          address: "Lead City University Campus, Toll Gate Area, Ibadan-Lagos Express Way, Ibadan, Oyo State",
          phone: "+234 803 456 7890",
          latitude: "7.3775",
          longitude: "3.9470",
          hours: "Mon - Fri: 8:00 AM - 4:00 PM"
        })
        .returning();
      branchList = [newBranch];
    }
    
    return branchList;
  }

  async getBranch(id: number): Promise<Branch | undefined> {
    this.checkDbConnection();
    const [branch] = await db.select().from(branches).where(eq(branches.id, id));
    return branch || undefined;
  }

  // News articles methods
  async getNewsArticles(category?: string): Promise<NewsArticle[]> {
    this.checkDbConnection();
    let query = db.select().from(newsArticles).orderBy(desc(newsArticles.createdAt));
    
    if (category && category !== 'All') {
      query = query.where(eq(newsArticles.category, category)) as any;
    }
    
    return await query;
  }

  async getFeaturedNewsArticle(): Promise<NewsArticle | null> {
    this.checkDbConnection();
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.featured, true));
    return article || null;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    this.checkDbConnection();
    const [newArticle] = await db.insert(newsArticles).values(article).returning();
    return newArticle;
  }

  async updateNewsArticle(id: number, article: InsertNewsArticle): Promise<NewsArticle> {
    this.checkDbConnection();
    const [updatedArticle] = await db
      .update(newsArticles)
      .set({ ...article, updatedAt: new Date() })
      .where(eq(newsArticles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteNewsArticle(id: number): Promise<void> {
    this.checkDbConnection();
    await db.delete(newsArticles).where(eq(newsArticles.id, id));
  }

  // Page content methods
  async getPageContent(pageId: string): Promise<PageContent | null> {
    this.checkDbConnection();
    const [content] = await db.select().from(pageContent).where(eq(pageContent.pageId, pageId));
    return content || null;
  }

  async updatePageContent(pageId: string, content: InsertPageContent): Promise<PageContent> {
    this.checkDbConnection();
    const existing = await this.getPageContent(pageId);
    
    if (existing) {
      const [updated] = await db
        .update(pageContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(pageContent.pageId, pageId))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(pageContent).values(content).returning();
      return created;
    }
  }

  // Page content sections methods
  async getPageContentSections(pageId: string): Promise<PageContentSection[]> {
    this.checkDbConnection();
    return await db.select().from(pageContentSections)
      .where(eq(pageContentSections.pageId, pageId))
      .orderBy(pageContentSections.orderIndex);
  }

  async createPageContentSection(section: InsertPageContentSection): Promise<PageContentSection> {
    this.checkDbConnection();
    const [newSection] = await db.insert(pageContentSections).values(section).returning();
    return newSection;
  }

  async updatePageContentSection(id: number, section: InsertPageContentSection): Promise<PageContentSection> {
    this.checkDbConnection();
    const [updatedSection] = await db
      .update(pageContentSections)
      .set({ ...section, updatedAt: new Date() })
      .where(eq(pageContentSections.id, id))
      .returning();
    return updatedSection;
  }

  async deletePageContentSection(id: number): Promise<void> {
    this.checkDbConnection();
    await db.delete(pageContentSections).where(eq(pageContentSections.id, id));
  }

  // Admin user methods
  async getAdminUser(username: string): Promise<AdminUser | null> {
    this.checkDbConnection();
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || null;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    this.checkDbConnection();
    const [newUser] = await db.insert(adminUsers).values(user).returning();
    return newUser;
  }
}

export const storage = new DatabaseStorage();
