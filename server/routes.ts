import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertPropertySchema, insertMessageSchema } from "../shared/schema.js";
import { z } from "zod";
import { setupAuth, requireAuth } from "./auth.js";
import multer from "multer";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  // Public Properties Routes
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
      const properties = await storage.getFeaturedProperties(limit);
      res.json(properties);
    } catch (error) {
      console.error("Error fetching featured properties:", error);
      res.status(500).json({ error: "Failed to fetch featured properties" });
    }
  });

  app.get("/api/debug/inspect", async (req, res) => {
    try {
      const allProps = await storage.getProperties();
      const debugData = allProps.map(p => ({
        id: p.id,
        idLength: p.id.length,
        // Show character codes to spot hidden chars
        idCodes: p.id.split('').map(c => c.charCodeAt(0)),
        title: p.title
      }));
      res.json({
        count: allProps.length,
        // Only show first 20 to avoid massive payload, but include our target if possible
        items: debugData
      });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const requestedId = req.params.id.trim();
      console.log(`[DEBUG] GET /api/properties/:id HIT`);
      console.log(`[DEBUG] Requested ID (raw): '${req.params.id}'`);
      console.log(`[DEBUG] Requested ID (trimmed): '${requestedId}'`);

      let property = await storage.getProperty(requestedId);

      if (!property) {
        console.log(`[DEBUG] Direct lookup failed. Trying to find property by iterating all properties to spot encoding issues...`);
        const allProps = await storage.getProperties();
        const found = allProps.find(p => p.id.trim() === requestedId);

        if (found) {
          console.log(`[DEBUG] Found property via manual iteration! ID matched: '${found.id}'`);
          property = found;
        } else {
          console.log(`[DEBUG] Manual iteration also failed. IDs available: ${allProps.map(p => p.id).slice(0, 5).join(', ')}...`);
        }
      }

      console.log(`[DEBUG] Final Result: ${property ? "Found" : "Not Found"}`);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Protected Admin Routes - Properties
  app.post("/api/properties", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Failed to create property" });
    }
  });

  app.patch("/api/properties/:id", requireAuth, async (req, res) => {
    try {
      const existingProperty = await storage.getProperty(req.params.id);
      if (!existingProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
      const updateData = { ...req.body };
      if (updateData.images === undefined || updateData.images === null) {
        updateData.images = existingProperty.images;
      }
      if (updateData.coverImage === undefined || updateData.coverImage === null) {
        updateData.coverImage = existingProperty.coverImage;
      }
      const property = await storage.updateProperty(req.params.id, updateData);
      res.json(property);
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteProperty(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  });

  // Protected Admin Routes - Messages
  app.get("/api/messages", requireAuth, async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/messages/:id", requireAuth, async (req, res) => {
    try {
      const message = await storage.getMessage(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      console.error("Error fetching message:", error);
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  // Public route - Contact form submission
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  app.patch("/api/messages/:id/read", requireAuth, async (req, res) => {
    try {
      await storage.markMessageAsRead(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  app.delete("/api/messages/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteMessage(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Admin Stats Route
  app.get("/api/admin/stats", requireAuth, async (req, res) => {
    try {
      const properties = await storage.getProperties();
      const messages = await storage.getMessages();
      const unreadMessages = messages.filter(m => !m.read).length;

      res.json({
        totalProperties: properties.length,
        totalMessages: messages.length,
        unreadMessages,
        propertiesForSale: properties.filter(p => p.purpose === "Venda").length,
        propertiesForRent: properties.filter(p => p.purpose === "Aluguel").length,
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Image Upload Route - Cloudinary
  app.post("/api/upload", requireAuth, upload.array("images", 10), async (req, res) => {
    console.log("Upload request received. Files:", (req.files as any[])?.length);
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const uploadPromises = files.map(file => uploadToCloudinary(file.buffer));
      const urls = await Promise.all(uploadPromises);

      res.json({ urls });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ error: "Falha ao fazer upload das imagens" });
    }
  });

  // Delete uploaded image from Cloudinary
  app.delete("/api/upload", requireAuth, async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL da imagem não fornecida" });
      }

      await deleteFromCloudinary(url);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Falha ao deletar imagem" });
    }
  });

  // Sitemap endpoint (dynamic). Set SITE_URL env var to production domain (e.g. https://www.example.com)
  app.get('/sitemap.xml', async (_req, res) => {
    try {
      const siteUrl = process.env.SITE_URL || 'https://angolaimobiliaria.vercel.app';

      const escapeXml = (str: string) =>
        String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');

      const properties = await storage.getProperties();
      const urls = properties
        .map(p => `\n    <url>\n      <loc>${escapeXml(`${siteUrl}/properties/${p.id}`)}</loc>\n      <changefreq>weekly</changefreq>\n      <priority>0.7</priority>\n    </url>`)
        .join('');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(siteUrl)}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${escapeXml(`${siteUrl}/properties`)}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>${urls}\n</urlset>`;

      res.header('Content-Type', 'application/xml').send(xml);
    } catch (e) {
      console.error('Error generating sitemap', e);
      res.status(500).send('Error generating sitemap');
    }
  });

  return httpServer;
}
