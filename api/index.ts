import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

let initialized = false;
let initError: Error | null = null;

async function initializeApp() {
  if (initialized) return;
  if (initError) throw initError;
  
  try {
    await registerRoutes(httpServer, app);
    initialized = true;
  } catch (error) {
    initError = error as Error;
    console.error("Failed to initialize app:", error);
    throw error;
  }
}

export default async function handler(req: Request, res: Response) {
  try {
    await initializeApp();
    app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
