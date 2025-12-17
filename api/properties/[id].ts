import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const { db } = await import('../../server/db.js');
    const { properties } = await import('../../shared/schema.js');
    const { eq } = await import('drizzle-orm');

    try {
        // Handle GET request - fetch property
        if (req.method === 'GET') {
            const [property] = await db.select().from(properties).where(eq(properties.id, id.trim()));

            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }

            return res.status(200).json(property);
        }

        // Handle PATCH request - update property
        if (req.method === 'PATCH') {
            const updateData = req.body;

            // Update the property
            await db
                .update(properties)
                .set({
                    ...updateData,
                    updatedAt: new Date().toISOString()
                })
                .where(eq(properties.id, id.trim()));

            // Fetch and return updated property
            const [updatedProperty] = await db
                .select()
                .from(properties)
                .where(eq(properties.id, id.trim()));

            if (!updatedProperty) {
                return res.status(404).json({ error: 'Property not found' });
            }

            return res.status(200).json(updatedProperty);
        }

        // Handle DELETE request - remove property (requires Authorization Bearer token)
        if (req.method === 'DELETE') {
            try {
                const auth = req.headers.authorization;
                if (!auth || !auth.startsWith('Bearer ')) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const token = auth.substring(7);
                const SECRET = process.env.SESSION_SECRET || 'fallback-secret-key';
                try {
                    jwt.verify(token, SECRET);
                } catch (e) {
                    return res.status(401).json({ error: 'Invalid token' });
                }

                const [property] = await db.select().from(properties).where(eq(properties.id, id.trim()));
                if (!property) {
                    return res.status(404).json({ error: 'Property not found' });
                }

                // attempt to delete images from Cloudinary (best-effort)
                try {
                    const { deleteFromCloudinary } = await import('../../server/cloudinary.js');
                    if (property.coverImage) await deleteFromCloudinary(property.coverImage as any);
                    if (Array.isArray(property.images)) {
                        for (const img of property.images) {
                            if (img) await deleteFromCloudinary(img as any);
                        }
                    }
                } catch (imgErr) {
                    console.error('Error deleting images (continuing):', imgErr);
                }

                await db.delete(properties).where(eq(properties.id, id.trim()));
                return res.status(204).send('');
            } catch (delErr: any) {
                console.error('Error deleting property in API function:', delErr);
                return res.status(500).json({ error: 'Failed to delete property', details: String(delErr.message || delErr) });
            }
        }

        // Method not allowed
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error: any) {
        console.error('Error in properties endpoint:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}
