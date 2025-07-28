import { Schema, model, Document, Model } from 'mongoose';

// Interface representing a subscriber document in MongoDB
export interface ISubscriber extends Document {
  email: string;
  name: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed' | 'pending';
  metadata: {
    createdAt: Date;
    lastModified: Date;
    source?: string; // Track where the subscription came from
    ipAddress?: string; // For analytics
  };
  // Virtual properties
  isActive: boolean;
  subscriptionAge: number; // Days since subscription
}

// Create the schema with validation and middleware
const subscriberSchema = new Schema<ISubscriber>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Please enter a valid email address'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'unsubscribed', 'pending'],
      message: 'Status must be active, unsubscribed, or pending'
    },
    default: 'active',
    required: true
  },
  metadata: {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    lastModified: {
      type: Date,
      default: Date.now,
      required: true
    },
    source: {
      type: String,
      enum: ['newsletter', 'coming-soon', 'footer', 'contact'],
      default: 'newsletter'
    },
    ipAddress: String
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true }, // Include virtuals when converting to JSON
  toObject: { virtuals: true }
});

// Virtual property to check if subscriber is active
subscriberSchema.virtual('isActive').get(function(this: ISubscriber) {
  return this.status === 'active';
});

// Virtual property to calculate subscription age in days
subscriberSchema.virtual('subscriptionAge').get(function(this: ISubscriber) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - this.subscribedAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to update lastModified
subscriberSchema.pre('save', function(next) {
  this.metadata.lastModified = new Date();
  next();
});

// Pre-save middleware to validate email uniqueness
subscriberSchema.pre('save', async function(next) {
  if (this.isModified('email')) {
    const SubscriberModel = this.constructor as Model<ISubscriber>;
    const existingSubscriber = await SubscriberModel.findOne({ 
      email: this.email,
      _id: { $ne: this._id } // Exclude current document
    });
    
    if (existingSubscriber) {
      const error = new Error('Email already subscribed');
      return next(error);
    }
  }
  next();
});

// Create indexes for better performance
subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscribedAt: -1 });
subscriberSchema.index({ 'metadata.source': 1 });

// Create and export the model
export const Subscriber = model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber; 