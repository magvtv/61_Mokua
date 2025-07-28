import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connect, disconnect } from 'mongoose';
import { Subscriber } from '../src/models/Subscriber.js';

// Rate limiting middleware
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimit: Record<string, RateLimitEntry> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function rateLimiter(req: VercelRequest, res: VercelResponse, next: () => void): void {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  if (!rateLimit[ip as string]) {
    rateLimit[ip as string] = {
      count: 1,
      resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
    next();
    return;
  }

  if (Date.now() > rateLimit[ip as string].resetTime) {
    rateLimit[ip as string] = {
      count: 1,
      resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
    next();
    return;
  }

  if (rateLimit[ip as string].count >= MAX_REQUESTS) {
    res.status(429).json({ message: 'Too many requests, please try again later' });
    return;
  }

  rateLimit[ip as string].count++;
  next();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Apply rate limiting
  rateLimiter(req, res, () => {
    handleSubscribe(req, res);
  });
}

async function handleSubscribe(req: VercelRequest, res: VercelResponse) {
  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority";
    await connect(uri);

    const { email, name, source = 'newsletter' } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    // Create new subscriber using Mongoose model
    const subscriber = new Subscriber({
      email,
      name,
      metadata: {
        source,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress
      }
    });

    // Save the subscriber (validation and middleware will run automatically)
    await subscriber.save();

    // Disconnect from MongoDB
    await disconnect();

    return res.status(201).json({ 
      message: 'Subscription successful',
      subscriberId: subscriber._id 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as any;
      const messages = Object.values(validationError.errors).map((err: any) => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: messages 
      });
    }
    
    // Handle duplicate email error
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
} 