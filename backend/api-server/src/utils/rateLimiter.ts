import type { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimit: Record<string, RateLimitEntry> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  
  if (!rateLimit[ip]) {
    rateLimit[ip] = {
      count: 1,
      resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
    next();
    return;
  }

  if (Date.now() > rateLimit[ip].resetTime) {
    rateLimit[ip] = {
      count: 1,
      resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
    next();
    return;
  }

  if (rateLimit[ip].count >= MAX_REQUESTS) {
    res.status(429).json({ message: 'Too many requests, please try again later' });
    return;
  }

  rateLimit[ip].count++;
  next();
} 