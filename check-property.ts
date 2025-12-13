import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";

// Manually read .env to avoid dependency issues
const envPath = path.resolve(process.cwd(), ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.split("\n").forEach(line => {
    const [key, value] = line.split("=");
    if (key && value) env[key.trim()] = value.trim();
});

const url = env.TURSO_DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });
const targetId = "a1e5567e-6e55-4b2b-a6e0-e127e2302df6";

async function run() {
    try {
        console.log(`Buscando imóvel: ${targetId}...`);

        const result = await client.execute({
            sql: "SELECT * FROM properties WHERE id = ?",
            args: [targetId]
        });

        if (result.rows.length > 0) {
            console.log("✅ Imóvel ENCONTRADO no banco!");
            console.log("Dados:", result.rows[0]);
        } else {
            console.log("❌ Imóvel NÃO encontrado no banco de dados.");

            // Check if any properties exist
            const count = await client.execute("SELECT count(*) as total FROM properties");
            console.log(`Total de imóveis no banco: ${count.rows[0].total}`);

            // List a few valid IDs to compare
            const list = await client.execute("SELECT id FROM properties LIMIT 5");
            console.log("Exemplos de IDs existentes:", list.rows.map(r => r.id));
        }
    } catch (e) {
        console.error("Erro na consulta:", e.message);
    }
}

run();
