import { Express, Request, Response, NextFunction } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage.js";
import { User as SelectUser } from "../shared/schema.js";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface User extends SelectUser { }
    interface Request {
      user?: SelectUser;
    }
  }
}

const scryptAsync = promisify(scrypt);
const JWT_SECRET = process.env.SESSION_SECRET || "fallback-secret-key";

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateToken(user: SelectUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

function verifyToken(token: string): { id: string; email: string; username: string; role: string | null } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export function setupAuth(app: Express) {
  if (!process.env.SESSION_SECRET) {
    console.warn("SESSION_SECRET not set - using fallback (not secure for production)");
  }

  app.post("/api/login", async (req: Request, res: Response) => {
    console.log("POST /api/login hit with body:", req.body);
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      const isValid = await comparePasswords(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      const token = generateToken(user);
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({ ...userWithoutPassword, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.get("/api/user", async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.sendStatus(401);
    }

    const user = await storage.getUser(decoded.id);
    if (!user) {
      return res.sendStatus(401);
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  const user = await storage.getUser(decoded.id);
  if (!user) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  req.user = user;
  next();
}
