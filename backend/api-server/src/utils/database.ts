import { connect, disconnect } from 'mongoose';

const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await connect(uri);
    console.log('Successfully connected to MongoDB using Mongoose.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}

// Graceful shutdown handler
export function setupGracefulShutdown() {
  process.on('SIGINT', async () => {
    try {
      await disconnectFromDatabase();
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });
} 