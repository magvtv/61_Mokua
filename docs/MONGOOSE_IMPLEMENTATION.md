# Mongoose Email Subscription System

## Overview

This project now uses **Mongoose** instead of the raw MongoDB driver for the email subscription system. Mongoose provides:

- **Better Developer Experience**: Schema-based modeling with validation and middleware
- **Type Safety**: Full TypeScript support with autocomplete in your IDE
- **Data Transformation**: Virtual properties and easy data manipulation
- **Built-in Features**: Connection pooling, retry logic, and rich query capabilities
- **Validation**: Automatic validation with custom error messages

## Architecture

### 1. Mongoose Model (`src/models/Subscriber.ts`)

```typescript
interface ISubscriber extends Document {
  email: string;
  name: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed' | 'pending';
  metadata: {
    createdAt: Date;
    lastModified: Date;
    source?: string; // Track subscription source
    ipAddress?: string; // For analytics
  };
  // Virtual properties
  isActive: boolean;
  subscriptionAge: number; // Days since subscription
}
```

### 2. Schema Features

#### Validation
- **Email**: Required, unique, lowercase, trimmed, with regex validation
- **Name**: Required, 2-100 characters, trimmed
- **Status**: Enum with 'active', 'unsubscribed', 'pending'
- **Source**: Tracks where subscription came from (newsletter, coming-soon, footer, contact)

#### Virtual Properties
- `isActive`: Returns true if status is 'active'
- `subscriptionAge`: Calculates days since subscription

#### Middleware
- **Pre-save**: Updates `lastModified` timestamp
- **Pre-save**: Validates email uniqueness before saving

#### Indexes
- Email (unique)
- Status
- SubscribedAt (descending)
- Metadata.source

### 3. Server Implementation (`server.js`)

#### Connection
```javascript
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
```

#### API Endpoints

**POST /api/subscribe**
- Creates new subscriber using Mongoose model
- Automatic validation and middleware execution
- Handles validation errors and duplicate emails
- Tracks source and IP address

**GET /api/subscribers**
- Returns all active subscribers
- Includes email, name, subscription date, and source
- Sorted by subscription date (newest first)

**POST /api/unsubscribe**
- Updates subscriber status to 'unsubscribed'
- Updates lastModified timestamp

### 4. Frontend Components

#### NewsletterSignup.tsx
- Collects both name and email
- Connects to `/api/subscribe` endpoint
- Sends `source: 'newsletter'`
- Proper error handling and user feedback

#### ComingSoonPage.tsx
- Collects both name and email
- Connects to `/api/subscribe` endpoint
- Sends `source: 'coming-soon'`
- Uses content from JSON file for messages

#### Footer.tsx
- Collects both name and email
- Connects to `/api/subscribe` endpoint
- Sends `source: 'footer'`
- Compact form design

## Benefits of Mongoose Approach

### 1. **Schema-Based Validation**
```javascript
email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
  lowercase: true,
  trim: true,
  validate: {
    validator: function(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    message: 'Please enter a valid email address'
  }
}
```

### 2. **Automatic Middleware**
```javascript
// Pre-save middleware
subscriberSchema.pre('save', function(next) {
  this.metadata.lastModified = new Date();
  next();
});
```

### 3. **Virtual Properties**
```javascript
subscriberSchema.virtual('isActive').get(function() {
  return this.status === 'active';
});
```

### 4. **Type Safety**
```typescript
export interface ISubscriber extends Document {
  email: string;
  name: string;
  // ... other properties
}
```

### 5. **Rich Query Capabilities**
```javascript
// Find active subscribers
const activeSubscribers = await Subscriber.find({ status: 'active' });

// Find by source
const newsletterSubscribers = await Subscriber.find({ 'metadata.source': 'newsletter' });

// Complex queries with sorting and limiting
const recentSubscribers = await Subscriber
  .find({ status: 'active' })
  .sort({ subscribedAt: -1 })
  .limit(10);
```

## Error Handling

### Validation Errors
```javascript
if (error.name === 'ValidationError') {
  const messages = Object.values(error.errors).map(err => err.message);
  return res.status(400).json({ 
    message: 'Validation failed', 
    errors: messages 
  });
}
```

### Duplicate Email Errors
```javascript
if (error.code === 11000) {
  return res.status(409).json({ message: 'Email already subscribed' });
}
```

## Security Features

### Rate Limiting
- 5 requests per minute per IP
- Configurable window and limit

### Input Validation
- Server-side validation with Mongoose schemas
- Client-side validation in forms
- Email format validation
- Required field checking

### Data Sanitization
- Email addresses are automatically lowercased and trimmed
- Names are trimmed and length-validated
- IP addresses are tracked for analytics

## Performance Optimizations

### Indexes
```javascript
subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscribedAt: -1 });
subscriberSchema.index({ 'metadata.source': 1 });
```

### Connection Pooling
Mongoose automatically handles connection pooling with MongoDB Atlas.

### Query Optimization
- Selective field projection with `.select()`
- Proper sorting with `.sort()`
- Efficient filtering with `.find()`

## Deployment

### Environment Variables
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority
```

### MongoDB Atlas Setup
1. Create MongoDB Atlas account
2. Create a free cluster
3. Configure network access (allow all IPs for development)
4. Create database user with read/write permissions
5. Get connection string and add to environment variables

## Testing

### Manual Testing
1. Start server: `pnpm server`
2. Start frontend: `pnpm dev`
3. Test subscription forms on different pages
4. Check MongoDB Atlas for stored data
5. Test unsubscribe functionality

### API Testing
```bash
# Subscribe
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","source":"newsletter"}'

# Get subscribers
curl http://localhost:3001/api/subscribers

# Unsubscribe
curl -X POST http://localhost:3001/api/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Future Enhancements

### Email Verification
- Add email verification workflow
- Send verification emails using nodemailer
- Track verification status in schema

### Admin Dashboard
- Create admin interface to view subscribers
- Export subscriber data
- Analytics and insights

### Advanced Analytics
- Track subscription sources
- Monitor conversion rates
- A/B testing capabilities

### Email Campaigns
- Integrate with email service providers
- Automated newsletter sending
- Campaign tracking and analytics

## Migration from Raw MongoDB Driver

### What Changed
1. **Replaced MongoDB driver with Mongoose**
2. **Added schema-based validation**
3. **Implemented middleware for automatic updates**
4. **Added virtual properties for computed fields**
5. **Enhanced error handling with specific error types**
6. **Improved TypeScript support**

### Benefits Achieved
- ✅ Better developer experience with schema validation
- ✅ Type safety and autocomplete in IDE
- ✅ Easy data transformation with virtual properties
- ✅ Built-in connection pooling and retry logic
- ✅ Rich query capabilities with Mongoose methods
- ✅ Automatic validation and middleware execution
- ✅ Better error handling and user feedback
- ✅ Source tracking for analytics
- ✅ Proper indexing for performance

The Mongoose implementation provides a more robust, maintainable, and feature-rich email subscription system compared to the raw MongoDB driver approach. 