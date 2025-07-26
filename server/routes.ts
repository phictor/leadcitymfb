import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { 
  contactInfo, 
  products, 
  rates, 
  aboutSections, 
  teamMembers, 
  achievements 
} from "@shared/schema";
import { 
  insertAccountApplicationSchema, 
  insertLoanApplicationSchema, 
  insertContactMessageSchema,
  insertNewsArticleSchema,
  insertPageContentSchema,
  insertPageContentSectionSchema,
  insertAdminUserSchema,
  insertHeroSlideSchema,
  insertProductCardSchema,
  insertFaqItemSchema,
  insertContactInfoSchema,
  insertProductSchema,
  insertRateSchema,
  insertAboutSectionSchema,
  insertTeamMemberSchema,
  insertAchievementSchema
} from "@shared/schema";
import bcrypt from "bcrypt";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Account applications
  app.post("/api/account-applications", async (req, res) => {
    try {
      const validatedData = insertAccountApplicationSchema.parse(req.body);
      const application = await storage.createAccountApplication(validatedData);
      res.json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/account-applications", async (req, res) => {
    try {
      const applications = await storage.getAccountApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Loan applications
  app.post("/api/loan-applications", async (req, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(validatedData);
      res.json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact messages
  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Branches
  app.get("/api/branches", async (req, res) => {
    try {
      const branches = await storage.getBranches();
      res.json(branches);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // News articles
  app.get("/api/news-articles", async (req, res) => {
    try {
      const { category } = req.query;
      const articles = await storage.getNewsArticles(category as string);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/news-articles/featured", async (req, res) => {
    try {
      const article = await storage.getFeaturedNewsArticle();
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/news-articles", async (req, res) => {
    try {
      const validatedData = insertNewsArticleSchema.parse(req.body);
      const article = await storage.createNewsArticle(validatedData);
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put("/api/news-articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertNewsArticleSchema.parse(req.body);
      const article = await storage.updateNewsArticle(id, validatedData);
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/news-articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNewsArticle(id);
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Page content management
  app.get("/api/page-content/:pageId", async (req, res) => {
    try {
      const content = await storage.getPageContent(req.params.pageId);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/page-content/:pageId", async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.parse({
        pageId: req.params.pageId,
        ...req.body
      });
      const content = await storage.updatePageContent(req.params.pageId, validatedData);
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Page content sections management
  app.get("/api/page-content-sections/:pageId", async (req, res) => {
    try {
      const sections = await storage.getPageContentSections(req.params.pageId);
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/page-content-sections", async (req, res) => {
    try {
      const validatedData = insertPageContentSectionSchema.parse(req.body);
      const section = await storage.createPageContentSection(validatedData);
      res.json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put("/api/page-content-sections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPageContentSectionSchema.parse(req.body);
      const section = await storage.updatePageContentSection(id, validatedData);
      res.json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/page-content-sections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePageContentSection(id);
      res.json({ message: "Section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin authentication - Fixed credentials only
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Fixed admin credentials - only these work
      const ADMIN_USERNAME = "ctiardemmanuel";
      const ADMIN_PASSWORD = "DrEmmanuelcomputer";
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true, message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Homepage Content Management APIs
  
  // Hero Slides
  app.get("/api/hero-slides", async (req, res) => {
    try {
      const slides = await storage.getHeroSlides();
      res.json(slides);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/hero-slides", async (req, res) => {
    try {
      const slideData = insertHeroSlideSchema.parse(req.body);
      const slide = await storage.createHeroSlide(slideData);
      res.status(201).json(slide);
    } catch (error) {
      res.status(400).json({ message: "Invalid slide data" });
    }
  });

  app.put("/api/hero-slides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const slideData = insertHeroSlideSchema.parse(req.body);
      const slide = await storage.updateHeroSlide(id, slideData);
      res.json(slide);
    } catch (error) {
      res.status(400).json({ message: "Invalid slide data" });
    }
  });

  app.delete("/api/hero-slides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteHeroSlide(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Product Cards
  app.get("/api/product-cards", async (req, res) => {
    try {
      const cards = await storage.getProductCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/product-cards", async (req, res) => {
    try {
      const cardData = insertProductCardSchema.parse(req.body);
      const card = await storage.createProductCard(cardData);
      res.status(201).json(card);
    } catch (error) {
      res.status(400).json({ message: "Invalid card data" });
    }
  });

  app.put("/api/product-cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cardData = insertProductCardSchema.parse(req.body);
      const card = await storage.updateProductCard(id, cardData);
      res.json(card);
    } catch (error) {
      res.status(400).json({ message: "Invalid card data" });
    }
  });

  app.delete("/api/product-cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProductCard(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // FAQ Items
  app.get("/api/faq-items", async (req, res) => {
    try {
      const items = await storage.getFaqItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/faq-items", async (req, res) => {
    try {
      const itemData = insertFaqItemSchema.parse(req.body);
      const item = await storage.createFaqItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid FAQ data" });
    }
  });

  app.put("/api/faq-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itemData = insertFaqItemSchema.parse(req.body);
      const item = await storage.updateFaqItem(id, itemData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid FAQ data" });
    }
  });

  app.delete("/api/faq-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFaqItem(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact Information routes
  app.get("/api/contact-info", async (req, res) => {
    try {
      const info = await db.select().from(contactInfo).orderBy(contactInfo.createdAt);
      res.json(info);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ error: "Failed to fetch contact information" });
    }
  });

  app.post("/api/contact-info", async (req, res) => {
    try {
      const result = insertContactInfoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid contact info data", details: result.error.issues });
      }

      const [newInfo] = await db.insert(contactInfo).values(result.data).returning();
      res.status(201).json(newInfo);
    } catch (error) {
      console.error("Error creating contact info:", error);
      res.status(500).json({ error: "Failed to create contact information" });
    }
  });

  app.put("/api/contact-info/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertContactInfoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid contact info data", details: result.error.issues });
      }

      const [updatedInfo] = await db
        .update(contactInfo)
        .set({ ...result.data, updatedAt: new Date() })
        .where(eq(contactInfo.id, id))
        .returning();

      if (!updatedInfo) {
        return res.status(404).json({ error: "Contact info not found" });
      }

      res.json(updatedInfo);
    } catch (error) {
      console.error("Error updating contact info:", error);
      res.status(500).json({ error: "Failed to update contact information" });
    }
  });

  app.delete("/api/contact-info/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const [deletedInfo] = await db.delete(contactInfo).where(eq(contactInfo.id, id)).returning();
      
      if (!deletedInfo) {
        return res.status(404).json({ error: "Contact info not found" });
      }

      res.json({ message: "Contact information deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact info:", error);
      res.status(500).json({ error: "Failed to delete contact information" });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const productList = await db.select().from(products).orderBy(products.sortOrder);
      res.json(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const result = insertProductSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid product data", details: result.error.issues });
      }

      const [newProduct] = await db.insert(products).values(result.data).returning();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertProductSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid product data", details: result.error.issues });
      }

      const [updatedProduct] = await db
        .update(products)
        .set({ ...result.data, updatedAt: new Date() })
        .where(eq(products.id, id))
        .returning();

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const [deletedProduct] = await db.delete(products).where(eq(products.id, id)).returning();
      
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // About Sections routes
  app.get("/api/about-sections", async (req, res) => {
    try {
      const sections = await db.select().from(aboutSections).orderBy(aboutSections.sortOrder);
      res.json(sections);
    } catch (error) {
      console.error("Error fetching about sections:", error);
      res.status(500).json({ error: "Failed to fetch about sections" });
    }
  });

  app.post("/api/about-sections", async (req, res) => {
    try {
      const result = insertAboutSectionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid about section data", details: result.error.issues });
      }

      const [newSection] = await db.insert(aboutSections).values(result.data).returning();
      res.status(201).json(newSection);
    } catch (error) {
      console.error("Error creating about section:", error);
      res.status(500).json({ error: "Failed to create about section" });
    }
  });

  app.put("/api/about-sections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertAboutSectionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid about section data", details: result.error.issues });
      }

      const [updatedSection] = await db
        .update(aboutSections)
        .set({ ...result.data, updatedAt: new Date() })
        .where(eq(aboutSections.id, id))
        .returning();

      if (!updatedSection) {
        return res.status(404).json({ error: "About section not found" });
      }

      res.json(updatedSection);
    } catch (error) {
      console.error("Error updating about section:", error);
      res.status(500).json({ error: "Failed to update about section" });
    }
  });

  app.delete("/api/about-sections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const [deletedSection] = await db.delete(aboutSections).where(eq(aboutSections.id, id)).returning();
      
      if (!deletedSection) {
        return res.status(404).json({ error: "About section not found" });
      }

      res.json({ message: "About section deleted successfully" });
    } catch (error) {
      console.error("Error deleting about section:", error);
      res.status(500).json({ error: "Failed to delete about section" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
