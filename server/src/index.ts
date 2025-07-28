import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;

// Load environment variables
dotenv.config();

// Import utilities and routes
import { connectToDatabase, setupGracefulShutdown } from './utils/database.js';
import { rateLimiter } from './utils/rateLimiter.js';
import { handleSubscribe } from './routes/subscribe.js';
import { Subscriber } from './models/Subscriber.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
connectToDatabase();

// Setup graceful shutdown
setupGracefulShutdown();

// Subscribe endpoint
app.post('/api/subscribe', rateLimiter, handleSubscribe);

// Get all active subscribers (for admin purposes)
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ status: 'active' })
      .select('email name subscribedAt metadata.source')
      .sort({ subscribedAt: -1 });
    
    return res.status(200).json({ subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    
    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found' });
    }

    subscriber.status = 'unsubscribed';
    subscriber.metadata.lastModified = new Date();
    await subscriber.save();

    return res.status(200).json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 