import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup seed data if empty
  setupSeedData();

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(404).json({ message: "Invalid product ID" });
    }
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.get(api.vendors.getProducts.path, async (req, res) => {
    const vendorName = req.params.name;
    const products = await storage.getProductsByVendor(vendorName);
    res.json(products);
  });

  return httpServer;
}

async function setupSeedData() {
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      console.log("Seeding database with mock products...");
      const mockProducts = [
        {
          title: "Premium Wireless Headphones",
          price: "199.99",
          rating: "4.8",
          vendor: "AudioTech",
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
        },
        {
          title: "Minimalist Smartwatch",
          price: "249.50",
          rating: "4.5",
          vendor: "TechGear",
          category: "Wearables",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Sleek smartwatch tracking your fitness, heart rate, and notifications."
        },
        {
          title: "Ergonomic Office Chair",
          price: "159.00",
          rating: "4.7",
          vendor: "ComfortPlus",
          category: "Furniture",
          image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Designed for all-day comfort with adjustable lumbar support."
        },
        {
          title: "Mechanical Gaming Keyboard",
          price: "129.99",
          rating: "4.9",
          vendor: "TechGear",
          category: "Accessories",
          image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "RGB mechanical keyboard with tactile switches for the ultimate gaming experience."
        },
        {
          title: "Ceramic Coffee Mug",
          price: "24.99",
          rating: "4.6",
          vendor: "HomeEssentials",
          category: "Home",
          image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Handcrafted ceramic mug perfect for your morning coffee or tea."
        },
        {
          title: "Noise-Cancelling Earbuds",
          price: "149.99",
          rating: "4.4",
          vendor: "AudioTech",
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1572569433602-66b402655b35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Compact wireless earbuds with active noise cancellation."
        }
      ];

      for (const product of mockProducts) {
        await storage.createProduct(product);
      }
      console.log("Database seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
