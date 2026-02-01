import type { Request, Response } from 'express';
import { Subscriber } from '../models/Subscriber.js';
import { connectToDatabase, disconnectFromDatabase } from '../utils/database.js';
import { sendWelcomeEmail } from '../services/emailService.js';

export async function handleSubscribe(req: Request, res: Response) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

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
        ipAddress: req.ip || req.connection.remoteAddress
      }
    });

    // Save the subscriber (validation and middleware will run automatically)
    await subscriber.save();

    // Send welcome email asynchronously (don't block the response)
    // If email fails, log the error but still return success for the subscription
    sendWelcomeEmail(email, name)
      .then((result) => {
        if (result.success) {
          console.log(`Welcome email sent to ${email}`);
        } else {
          console.error(`Failed to send welcome email to ${email}:`, result.error);
        }
      })
      .catch((error) => {
        console.error(`Unexpected error sending welcome email to ${email}:`, error);
      });

    // Disconnect from MongoDB (for serverless functions)
    await disconnectFromDatabase();

    return res.status(201).json({ 
      message: 'Subscription successful',
      subscriberId: subscriber._id 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as unknown as { errors: Record<string, { message: string }> };
      const messages = Object.values(validationError.errors).map((err) => err.message);
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