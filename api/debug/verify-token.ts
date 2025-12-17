import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = (req.headers.authorization as string) || req.query.token as string;
  if (!authHeader) return res.status(400).json({ error: 'Missing token (use Authorization header or ?token=)' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  try {
    const jwt = await import('jsonwebtoken');
    const SECRET = process.env.SESSION_SECRET || 'fallback-secret-key';
    const decoded = jwt.verify(token, SECRET);
    return res.status(200).json({ ok: true, decoded });
  } catch (err: any) {
    return res.status(401).json({ ok: false, error: String(err.message || err) });
  }
}
