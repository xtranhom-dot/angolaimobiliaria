import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes, randomUUID } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  const email = process.env.CREATE_ADMIN_EMAIL || "imobiliarioangola@admin.com";
  const password = process.env.CREATE_ADMIN_PASSWORD || "Imobiliario909192";
  const hashedPassword = await hashPassword(password);
  const id = randomUUID();

  try {
    // Check if admin already exists
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) {
      console.log("Admin user exists. Updating password...");
      await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email));
      console.log("Password updated successfully!");
      process.exit(0);
    }

    await db.insert(users).values({
      id,
      username: "Admin Angola Imobiliária",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email:", email);
    console.log("ID:", id);
    process.exit(0);
  } catch (error: any) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
