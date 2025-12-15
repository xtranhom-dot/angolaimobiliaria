import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { db } = await import('../server/db.js');
        const { properties } = await import('../shared/schema.js');
        const { eq } = await import('drizzle-orm');

        const featuredProperties = await db
            .select()
            .from(properties)
            .where(eq(properties.featured, true))
            .limit(6);

        res.status(200).json(featuredProperties);
    } catch (error: any) {
        console.error('Error fetching featured properties:', error);
        res.status(500).json({ error: 'Failed to fetch featured properties', details: error.message });
    }
}
