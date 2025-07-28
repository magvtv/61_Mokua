import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connect, disconnect } from 'mongoose';
import { Subscriber } from '../src/models/Subscriber.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority";
    await connect(uri);

    const subscribers = await Subscriber.find({ status: 'active' })
      .select('email name subscribedAt metadata.source')
      .sort({ subscribedAt: -1 });
    
    // Disconnect from MongoDB
    await disconnect();
    
    return res.status(200).json({ subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 