import { 
  users, 
  accountApplications, 
  loanApplications, 
  contactMessages, 
  branches,
  type User, 
  type InsertUser,
  type AccountApplication,
  type InsertAccountApplication,
  type LoanApplication,
  type InsertLoanApplication,
  type ContactMessage,
  type InsertContactMessage,
  type Branch
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createAccountApplication(application: InsertAccountApplication): Promise<AccountApplication> {
    const [accountApplication] = await db
      .insert(accountApplications)
      .values(application)
      .returning();
    return accountApplication;
  }

  async getAccountApplications(): Promise<AccountApplication[]> {
    return await db.select().from(accountApplications);
  }

  async getAccountApplication(id: number): Promise<AccountApplication | undefined> {
    const [application] = await db.select().from(accountApplications).where(eq(accountApplications.id, id));
    return application || undefined;
  }

  async createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication> {
    const [loanApplication] = await db
      .insert(loanApplications)
      .values(application)
      .returning();
    return loanApplication;
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return await db.select().from(loanApplications);
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    const [application] = await db.select().from(loanApplications).where(eq(loanApplications.id, id));
    return application || undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async getBranches(): Promise<Branch[]> {
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
    const [branch] = await db.select().from(branches).where(eq(branches.id, id));
    return branch || undefined;
  }
}

export const storage = new DatabaseStorage();
