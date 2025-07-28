import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority";
const dbName = process.env.MONGODB_DB || "newsletter";

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

// MongoDB client with modern options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection = null;

async function connectToDatabase() {
  if (dbConnection) return dbConnection;

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB.");
    
    dbConnection = client.db(dbName);
    return dbConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection('subscribers');

    // Check if email already exists using modern syntax
    const existingSubscriber = await collection.findOne({ email: email });
    if (existingSubscriber) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }

    // Insert new subscriber using modern syntax
    const result = await collection.insertOne({
      email,
      name,
      subscribedAt: new Date(),
      status: 'active',
      metadata: {
        createdAt: new Date(),
        lastModified: new Date()
      }
    });

    return res.status(201).json({ 
      message: 'Subscription successful',
      subscriberId: result.insertedId 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the connection to prevent memory leaks
    if (client) {
      await client.close();
      console.log('MongoDB connection closed.');
    }
  }
}