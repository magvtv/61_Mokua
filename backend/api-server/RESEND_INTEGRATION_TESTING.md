# Resend Email Integration - Testing Guide

## Prerequisites

Before testing the email integration, ensure you have:

1. **MongoDB Running**
   ```bash
   # Start MongoDB (if using systemd)
   sudo systemctl start mongod
   
   # Or if using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Environment Variables Configured**
   Create a `.env` file in `backend/api-server/` with:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/mokua
   
   # Email Service (Resend)
   RESEND_API_KEY=re_your_actual_api_key_here
   FROM_EMAIL=noreply@yourdomain.com
   
   # Optional: Frontend URL for email links
   FRONTEND_URL=http://localhost:5173
   
   # CORS
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Resend Account Setup**
   - Sign up at https://resend.com
   - Verify your domain (required for sending emails)
   - Generate an API key from the dashboard
   - Add the API key to your `.env` file

## Testing Steps

### 1. Start the API Server

```bash
cd backend/api-server
npm run dev
```

The server should start on `http://localhost:3001` (or your configured PORT).

### 2. Test Subscription with Welcome Email

**Using curl:**
```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "source": "newsletter"
  }'
```

**Expected Response:**
```json
{
  "message": "Subscription successful",
  "subscriberId": "65abc123..."
}
```

**What to Check:**
- Response returns 201 status code
- Subscriber is saved to MongoDB
- Welcome email is sent to the provided email address
- Check your email inbox for the welcome email
- Server logs show: "Welcome email sent to test@example.com"

### 3. Test Email Failure Handling

**Without Resend API Key:**
1. Remove or comment out `RESEND_API_KEY` from `.env`
2. Restart the server
3. Try subscribing again

**Expected Behavior:**
- Subscription still succeeds (201 status)
- User is saved to database
- Server logs error: "RESEND_API_KEY is not configured"
- No email is sent (graceful failure)

### 4. Test Duplicate Email

```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

**Expected Response:**
```json
{
  "message": "Email already subscribed"
}
```

**What to Check:**
- Response returns 409 status code
- No duplicate email sent
- Existing subscriber record unchanged

### 5. Test Invalid Email Format

```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "name": "Test User"
  }'
```

**Expected Response:**
```json
{
  "message": "Validation failed",
  "errors": ["Please enter a valid email"]
}
```

**What to Check:**
- Response returns 400 status code
- No database entry created
- No email sent

### 6. Test Unsubscribe with Confirmation Email

```bash
curl -X POST http://localhost:3001/api/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "message": "Successfully unsubscribed"
}
```

**What to Check:**
- Response returns 200 status code
- Subscriber status changed to 'unsubscribed' in database
- Unsubscribe confirmation email sent
- Check email inbox for confirmation

### 7. Test Rate Limiting

Run the subscription endpoint more than 5 times in quick succession from the same IP:

```bash
for i in {1..7}; do
  curl -X POST http://localhost:3001/api/subscribe \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"test$i@example.com\",
      \"name\": \"Test User $i\"
    }"
  echo ""
done
```

**Expected Behavior:**
- First 5 requests succeed
- 6th and 7th requests are rate limited (429 status)

### 8. Verify Email Content

When you receive the welcome email, check:
- ✅ Email renders correctly on desktop and mobile
- ✅ EB Garamond font loads properly
- ✅ Subscriber's name is personalized in the greeting
- ✅ All links work correctly
- ✅ Unsubscribe link is functional
- ✅ Email matches the literary theme (olive/khaki colors)
- ✅ "Rise Above" branding is consistent
- ✅ Tagline displays: "We live and die by the stories we tell"

## Monitoring

### Server Logs to Watch For

**Success:**
```
Welcome email sent to test@example.com
{ email: 'test@example.com', messageId: 're_123456...' }
```

**Email Service Not Configured:**
```
RESEND_API_KEY is not configured
Failed to send welcome email to test@example.com: Email service not configured
```

**Resend API Error:**
```
Failed to send welcome email to test@example.com: [Resend error message]
```

### Database Verification

Connect to MongoDB and verify:

```bash
mongosh mongodb://localhost:27017/mokua

# View subscribers
db.subscribers.find().pretty()

# Count active subscribers
db.subscribers.countDocuments({ status: 'active' })

# Find specific subscriber
db.subscribers.findOne({ email: 'test@example.com' })
```

## Troubleshooting

### Email Not Received

1. **Check Resend Dashboard**
   - Log into https://resend.com/dashboard
   - View "Emails" section to see delivery status
   - Check for any errors or bounces

2. **Verify Domain**
   - Ensure your sending domain is verified in Resend
   - Check DNS records (SPF, DKIM)

3. **Check Spam Folder**
   - Welcome emails may be filtered as spam initially
   - Mark as "Not Spam" to improve deliverability

4. **Review Server Logs**
   - Look for error messages in the server console
   - Check for Resend API errors

### Server Won't Start

1. **MongoDB Connection**
   ```bash
   # Test MongoDB connection
   mongosh mongodb://localhost:27017/mokua
   ```

2. **Port Already in Use**
   ```bash
   # Find process using port 3001
   lsof -i :3001
   
   # Kill the process if needed
   kill -9 [PID]
   ```

3. **Missing Dependencies**
   ```bash
   cd backend/api-server
   npm install
   ```

## Success Criteria

✅ All tests pass as expected  
✅ Welcome emails are received within 1-2 seconds  
✅ Email content displays correctly  
✅ Subscription succeeds even if email fails  
✅ No server crashes from email errors  
✅ Rate limiting works properly  
✅ Database records are accurate  
✅ Unsubscribe flow works with confirmation email  

## Next Steps

Once testing is complete:

1. **Update Frontend**
   - Connect subscription forms to the API
   - Add success/error messaging
   - Implement loading states

2. **Production Setup**
   - Add production Resend API key
   - Configure production domain
   - Set up email monitoring/alerts
   - Add email analytics tracking

3. **Additional Features**
   - Newsletter campaigns
   - Email preferences management
   - Scheduled digest emails
   - Welcome series (multi-email onboarding)
