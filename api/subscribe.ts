import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleSubscribe } from '../server/src/routes/subscribe.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Use the shared subscribe handler
  await handleSubscribe(req as unknown as import('express').Request, res as unknown as import('express').Response);
} 