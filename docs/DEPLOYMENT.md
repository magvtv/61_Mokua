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

Newsletter subscription is handled by the **backend api-server** (`backend/api-server/`). Deploy it separately (e.g. Railway, Render) and point the frontend `VITE_API_URL` to that API URL. There is no root `api/` folder; the Express server provides `/subscribe` and related routes.

### 3. Deployment Commands

```bash
# Deploy to production
vercel --prod

# Or use the Vercel CLI
vercel deploy --prod
```

## Server Startup

- **Frontend**: Deploy to Vercel (or similar); set root directory to `frontend` if needed.
- **API (newsletter)**: Deploy `backend/api-server` to Railway, Render, or another Node host. It runs as a single Express server; no serverless `api/` folder.

## Testing Production

After deploying the API server, test the newsletter endpoints (replace `https://your-api.example.com` with your API base URL):

```bash
# Test subscription
curl -X POST https://your-api.example.com/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","source":"newsletter"}'

# Test unsubscribe (if you expose this route)
curl -X POST https://your-api.example.com/unsubscribe \
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