import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const { db } = await import('../../server/db.js');
        const { properties } = await import('../../shared/schema.js');
        const { eq } = await import('drizzle-orm');

        const [property] = await db.select().from(properties).where(eq(properties.id, id.trim()));

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json(property);
    } catch (error: any) {
        console.error('Error fetching property:', error);
        res.status(500).json({ error: 'Failed to fetch property', details: error.message });
    }
}
