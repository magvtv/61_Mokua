require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB using Mongoose.');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Import the Subscriber model
const { Subscriber } = require('./src/models/Subscriber.js');

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Rate limiting middleware
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  
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
    return res.status(429).json({ message: 'Too many requests, please try again later' });
  }

  rateLimit[ip].count++;
  next();
}

// Subscribe endpoint using Mongoose
app.post('/api/subscribe', rateLimiter, async (req, res) => {
  try {
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

    return res.status(201).json({ 
      message: 'Subscription successful',
      subscriberId: subscriber._id 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: messages 
      });
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
});

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