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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accountApplications: Map<number, AccountApplication>;
  private loanApplications: Map<number, LoanApplication>;
  private contactMessages: Map<number, ContactMessage>;
  private branches: Map<number, Branch>;
  private currentUserId: number;
  private currentAccountAppId: number;
  private currentLoanAppId: number;
  private currentContactId: number;
  private currentBranchId: number;

  constructor() {
    this.users = new Map();
    this.accountApplications = new Map();
    this.loanApplications = new Map();
    this.contactMessages = new Map();
    this.branches = new Map();
    this.currentUserId = 1;
    this.currentAccountAppId = 1;
    this.currentLoanAppId = 1;
    this.currentContactId = 1;
    this.currentBranchId = 1;
    
    // Initialize with sample branches
    this.initializeBranches();
  }

  private initializeBranches() {
    const sampleBranches: Omit<Branch, 'id'>[] = [
      {
        name: "Lead City University Branch",
        address: "Lead City University Campus, Toll Gate Area, Ibadan-Lagos Express Way, Ibadan, Oyo State",
        phone: "+234 803 456 7890",
        latitude: "7.3775",
        longitude: "3.9470",
        hours: "Mon - Fri: 8:00 AM - 4:00 PM"
      }
    ];

    sampleBranches.forEach(branch => {
      const id = this.currentBranchId++;
      this.branches.set(id, { ...branch, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAccountApplication(application: InsertAccountApplication): Promise<AccountApplication> {
    const id = this.currentAccountAppId++;
    const app: AccountApplication = { 
      ...application, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.accountApplications.set(id, app);
    return app;
  }

  async getAccountApplications(): Promise<AccountApplication[]> {
    return Array.from(this.accountApplications.values());
  }

  async getAccountApplication(id: number): Promise<AccountApplication | undefined> {
    return this.accountApplications.get(id);
  }

  async createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication> {
    const id = this.currentLoanAppId++;
    const app: LoanApplication = { 
      ...application, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.loanApplications.set(id, app);
    return app;
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return Array.from(this.loanApplications.values());
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    return this.loanApplications.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const msg: ContactMessage = { 
      ...message, 
      id, 
      status: "new",
      createdAt: new Date()
    };
    this.contactMessages.set(id, msg);
    return msg;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getBranches(): Promise<Branch[]> {
    return Array.from(this.branches.values());
  }

  async getBranch(id: number): Promise<Branch | undefined> {
    return this.branches.get(id);
  }
}

export const storage = new MemStorage();
