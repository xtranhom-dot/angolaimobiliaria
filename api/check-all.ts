import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { db } = await import('../server/db.js');
        const { properties } = await import('../shared/schema.js');

        // Get ALL properties to see their featured status
        const allProps = await db.select().from(properties);

        res.status(200).json({
            total: allProps.length,
            properties: allProps.map(p => ({
                id: p.id,
                title: p.title,
                featured: p.featured,
                featuredType: typeof p.featured
            }))
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}
