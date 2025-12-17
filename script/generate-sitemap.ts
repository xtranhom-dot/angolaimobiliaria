import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Dummy property type for build script (doesn't load database)
interface Property {
  id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: string;
  images?: string[];
}

async function generateSitemap() {
  try {
    console.log("🔨 Generating sitemap.xml...");

    const baseUrl = "https://angolaimobiliaria.vercel.app";

    // For build time, we'll create a basic sitemap
    // In production with API, the dynamic endpoint in routes.ts will handle properties
    const urls = [
      {
        loc: baseUrl,
        changefreq: "daily",
        priority: 1.0,
      },
      {
        loc: `${baseUrl}/properties`,
        changefreq: "daily",
        priority: 0.9,
      },
      {
        loc: `${baseUrl}/contact`,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        loc: `${baseUrl}/privacy-policy`,
        changefreq: "yearly",
        priority: 0.5,
      },
    ];

    const escapeXml = (str: string) =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    const urlElements = urls
      .map(
        (url) =>
          `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    const sitemapPath = path.join(projectRoot, "client/public/sitemap.xml");
    fs.writeFileSync(sitemapPath, xml, "utf-8");

    console.log(`✅ Sitemap generated at ${sitemapPath}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
