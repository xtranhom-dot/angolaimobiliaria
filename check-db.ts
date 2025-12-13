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

console.log("--- Diagnóstico de Conexão ---");
console.log("URL:", url);
console.log("Token (primeiros 10 chars):", authToken ? authToken.substring(0, 10) + "..." : "NÃO ENCONTRADO");

if (!url || !authToken) {
    console.error("ERRO: Faltam credenciais no arquivo .env");
    process.exit(1);
}

const client = createClient({
    url,
    authToken,
});

async function run() {
    try {
        console.log("Tentando conectar...");
        await client.execute("SELECT 1");
        console.log("✅ SUCESSO! As credenciais estão corretas.");

        console.log("Tentando aplicar migração manual...");
        try {
            await client.execute("ALTER TABLE properties ADD COLUMN features text DEFAULT '[]'");
            console.log("✅ Coluna 'features' adicionada com sucesso!");
        } catch (migError) {
            if (String(migError.message).includes("duplicate column")) {
                console.log("ℹ️ A coluna 'features' já existe. Nenhuma ação necessária.");
            } else {
                console.error("❌ Erro na migração:", migError.message);
                throw migError;
            }
        }

    } catch (e) {
        console.error("❌ FALHA! O banco de dados recusou a conexão.");
        console.error("Erro:", e.message);
        if (String(e.message).includes("401")) {
            console.error("\nDIAGNÓSTICO: O erro 401 confirma que o Token ou URL estão errados.");
        }
    }
}

run();
