import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = (req.query.secret as string) || req.headers['x-admin-secret'];
  const ADMIN_SECRET = process.env.ADMIN_SETUP_SECRET;

  if (!ADMIN_SECRET) {
    return res.status(500).json({ error: 'ADMIN_SETUP_SECRET not configured' });
  }

  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { storage } = await import('../../server/storage.js');
    const { hashPassword } = await import('../../server/auth.js');

    const email = process.env.CREATE_ADMIN_EMAIL || 'imobiliarioangola@admin.com';
    const password = process.env.CREATE_ADMIN_PASSWORD || 'Imobiliario909192';

    const existing = await storage.getUserByEmail(email);
    const hashed = await hashPassword(password);

    if (existing) {
      // update password
      await (await import('../../server/db.js')).then(async ({ db }) => {
        const { users } = await import('../../shared/schema.js');
        const { eq } = await import('drizzle-orm');
        await db.update(users).set({ password: hashed }).where(eq(users.email, email));
      });
      return res.status(200).json({ ok: true, message: 'Admin updated', email });
    }

    const username = process.env.CREATE_ADMIN_USERNAME || 'Admin';
    const id = (await import('crypto')).randomUUID();
    await (await import('../../server/db.js')).then(async ({ db }) => {
      const { users } = await import('../../shared/schema.js');
      await db.insert(users).values({ id, username, email, password: hashed, role: 'admin' } as any);
    });

    return res.status(201).json({ ok: true, message: 'Admin created', email });
  } catch (err: any) {
    console.error('create-admin error:', err);
    return res.status(500).json({ error: 'Internal error', details: String(err.message || err) });
  }
}
