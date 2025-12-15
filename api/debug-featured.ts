import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { db } = await import('../../server/db.js');
        const { properties } = await import('../../shared/schema.js');
        const { eq } = await import('drizzle-orm');

        // Get all properties
        const allProperties = await db.select().from(properties);

        // Get featured properties
        const featuredProperties = await db
            .select()
            .from(properties)
            .where(eq(properties.featured, true));

        res.status(200).json({
            totalProperties: allProperties.length,
            featuredCount: featuredProperties.length,
            allPropertiesSample: allProperties.slice(0, 3).map(p => ({
                id: p.id,
                title: p.title,
                featured: p.featured
            })),
            featuredProperties: featuredProperties.map(p => ({
                id: p.id,
                title: p.title,
                featured: p.featured
            }))
        });
    } catch (error: any) {
        res.status(500).json({
            error: 'Debug error',
            details: error.message
        });
    }
}
