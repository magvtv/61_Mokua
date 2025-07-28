# Email Subscription System

A modern implementation of an email subscription system using MongoDB Atlas and Mongoose, with modern Sass processing.

## Build Configuration

This project uses sass-embedded for modern Sass processing, avoiding legacy API warnings. The Vite configuration is set up to use the modern Sass API.

## Features

- Collects both email and name from users
- Uses modern Mongoose ODM with MongoDB Node.js driver
- Implements proper connection handling and cleanup
- Includes security measures (rate limiting, validation)
- Provides success/error notifications
- Schema-based validation and middleware
- Virtual properties and rich query capabilities

## MongoDB Setup

### 1. MongoDB Atlas Configuration

1. Create a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is sufficient)
3. In the cluster:
   - Click "Connect"
   - Select "Drivers" under "Connect to your application"
   - Choose "Node.js" and version "6.0 or later"
   - Copy the connection string

### 2. Environment Configuration

Update the `.env` file with your MongoDB connection details:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority
MONGODB_DB=newsletter
```

## Implementation Details

### Modern Mongoose Features Used

```javascript
// Mongoose schema with validation and middleware
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
  // ... other fields
});
```

### Subscriber Schema

```javascript
{
  email: String,      // Required, unique, validated
  name: String,       // Required, 2-100 characters
  subscribedAt: Date, // Automatically set
  status: String,     // 'active', 'unsubscribed', 'pending'
  metadata: {
    createdAt: Date,
    lastModified: Date,
    source: String,   // 'newsletter', 'coming-soon', 'footer', 'contact'
    ipAddress: String
  }
}
```

### Connection Handling

- **Development Server**: Maintains a persistent connection with proper cleanup
- **Mongoose Connection**: Uses connection pooling and retry logic automatically

### Security Measures

1. Rate Limiting:
   - 5 requests per minute per IP
   - Configurable window and limit

2. Input Validation:
   - Mongoose schema validation
   - Required field checking
   - Email format validation
   - Duplicate email prevention

3. Error Handling:
   - Proper error messages
   - Connection error handling
   - Cleanup on errors

## Running the System

1. Start the API server:
```bash
pnpm server
```

2. Start the frontend:
```bash
pnpm dev
```

## API Endpoints

### POST /api/subscribe

Request body:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "source": "newsletter"
}
```

Success Response (201):
```json
{
  "message": "Subscription successful",
  "subscriberId": "..."
}
```

Error Responses:
- 400: Invalid input
- 409: Email already exists
- 429: Too many requests
- 500: Server error

### GET /api/subscribers

Returns all active subscribers:
```json
{
  "subscribers": [
    {
      "email": "user@example.com",
      "name": "John Doe",
      "subscribedAt": "2024-01-01T00:00:00.000Z",
      "metadata": {
        "source": "newsletter"
      }
    }
  ]
}
```

### POST /api/unsubscribe

Request body:
```json
{
  "email": "user@example.com"
}
```

Success Response (200):
```json
{
  "message": "Successfully unsubscribed"
}
```

## Deployment Notes

### Vercel/Netlify Deployment

1. Add environment variables:
   - `MONGODB_URI`
   - `MONGODB_DB`

2. Update MongoDB Network Access:
   - Add deployment platform IP ranges
   - Or allow access from anywhere (less secure)

### Production Considerations

1. Connection Pooling:
   - Mongoose handles connection pooling automatically
   - Configure max pool size based on expected load

2. Error Monitoring:
   - Implement proper logging
   - Set up error tracking (e.g., Sentry)

3. Security:
   - Use environment variables
   - Implement proper CORS settings
   - Consider adding API key authentication

## Benefits of Mongoose Approach

- ✅ **Schema-based validation** with custom error messages
- ✅ **Automatic middleware** for timestamp updates
- ✅ **Virtual properties** for computed fields
- ✅ **Type safety** with TypeScript interfaces
- ✅ **Rich query capabilities** with Mongoose methods
- ✅ **Connection pooling** and retry logic
- ✅ **Source tracking** for analytics
- ✅ **Proper indexing** for performance