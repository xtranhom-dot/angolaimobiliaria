import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../shared/schema.js";

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl) {
  console.error("TURSO_DATABASE_URL is not set. Available env vars:", Object.keys(process.env).filter(k => k.includes("TURSO") || k.includes("DATABASE")));
  throw new Error(
    "TURSO_DATABASE_URL must be set. Did you forget to configure Turso?",
  );
}

if (!tursoToken) {
  console.error("TURSO_AUTH_TOKEN is not set.");
  throw new Error(
    "TURSO_AUTH_TOKEN must be set. Did you forget to configure Turso?",
  );
}

export const client = createClient({
  url: tursoUrl,
  authToken: tursoToken,
});

export const db = drizzle(client, { schema });
