import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connect, disconnect } from 'mongoose';
import { Subscriber } from '../src/models/Subscriber.js';

// Simple rate limiting for serverless
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  
  if (!entry) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }
  
  entry.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  if (!checkRateLimit(ip as string)) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not configured');
    }
    await connect(uri);

    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber && existingSubscriber.status === 'active') {
      return res.status(409).json({ message: 'Email already subscribed' });
    }

    // Create or update subscriber
    const subscriber = existingSubscriber || new Subscriber();
    subscriber.email = email.toLowerCase();
    subscriber.name = name || 'Anonymous'; // Provide default name
    subscriber.status = 'active';
    subscriber.subscribedAt = new Date();
    subscriber.metadata = {
      source: 'coming-soon', // Use valid enum value
      ipAddress: ip as string,
      lastModified: new Date()
      // Remove userAgent as it's not in schema
    };

    await subscriber.save();
    await disconnect();

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('duplicate key') || error.message.includes('Email already')) {
        return res.status(409).json({ message: 'Email already subscribed' });
      }
      if (error.message.includes('validation failed')) {
        return res.status(400).json({ message: 'Invalid data provided' });
      }
      if (error.message.includes('MONGODB_URI')) {
        return res.status(503).json({ message: 'Database connection error' });
      }
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Ensure disconnection even if error occurs
    try {
      await disconnect();
    } catch (disconnectError) {
      console.error('Disconnect error:', disconnectError);
    }
  }
}
