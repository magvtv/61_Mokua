# Deployment Guide for Mokua Literary Blog

## Database Setup

### MongoDB Atlas Configuration

1. **Current Database Issue:**
   - Your records are going to the `test` database instead of `newsletter`
   - This happens when the connection string doesn't specify a database name

2. **Fix the Connection String:**
   ```bash
   # Your current connection string should be:
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority
   ```

3. **Verify Database Name:**
   - Make sure your connection string ends with `/newsletter` (not `/test`)
   - The database name after the last `/` determines which database is used

## Vercel Deployment Setup

### 1. Environment Variables

Set these in your Vercel dashboard:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter?retryWrites=true&w=majority
```

### 2. Project Structure

Your project now has:
- `api/subscribe.ts` - Newsletter subscription endpoint
- `api/subscribers.ts` - Get all subscribers endpoint  
- `api/unsubscribe.ts` - Unsubscribe endpoint
- `vercel.json` - Vercel configuration

### 3. Deployment Commands

```bash
# Deploy to production
vercel --prod

# Or use the Vercel CLI
vercel deploy --prod
```

## Server Startup on Vercel

**How the server starts:**
1. Vercel automatically detects your API routes in the `api/` folder
2. Each `.ts` file becomes a serverless function
3. Functions are cold-started when first accessed
4. MongoDB connection is established per request (serverless pattern)

**No manual server startup needed** - Vercel handles everything automatically!

## Testing Production

After deployment, test your endpoints:

```bash
# Test subscription
curl -X POST https://your-domain.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","source":"newsletter"}'

# Test getting subscribers
curl https://your-domain.vercel.app/api/subscribers

# Test unsubscribe
curl -X POST https://your-domain.vercel.app/api/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Database Migration

**To move data from `test` to `newsletter` database:**

1. Export from test database:
   ```bash
   mongodump --uri="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/test"
   ```

2. Import to newsletter database:
   ```bash
   mongorestore --uri="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/newsletter" --nsFrom="test.*" --nsTo="newsletter.*"
   ```

## Monitoring

- Check Vercel dashboard for function logs
- Monitor MongoDB Atlas for database activity
- Set up alerts for subscription events

## Troubleshooting

**If records still go to `test` database:**
1. Check your `MONGODB_URI` environment variable
2. Ensure it ends with `/newsletter`
3. Verify the environment variable is set in Vercel dashboard

**If functions don't work:**
1. Check Vercel function logs
2. Verify MongoDB connection string
3. Test locally with `vercel dev` 