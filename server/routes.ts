import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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
  insertFaqItemSchema
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

  const httpServer = createServer(app);
  return httpServer;
}
