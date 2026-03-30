import mongoose, { Document, Schema } from 'mongoose';

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

const subscriberSchema = new Schema<ISubscriber>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'pending'],
    default: 'active'
  },
  metadata: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastModified: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      enum: ['newsletter', 'coming-soon', 'footer', 'contact'],
      default: 'newsletter'
    },
    ipAddress: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for checking if subscriber is active
subscriberSchema.virtual('isActive').get(function(this: ISubscriber) {
  return this.status === 'active';
});

// Virtual for subscription age in days
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

// Index for better query performance
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscribedAt: -1 });

export const Subscriber = mongoose.model<ISubscriber>('Subscriber', subscriberSchema); 