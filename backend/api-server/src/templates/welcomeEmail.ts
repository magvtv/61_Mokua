/**
 * Generate a welcome email HTML template
 * @param name - Subscriber's name for personalization
 * @returns HTML string for the welcome email
 */
export function getWelcomeEmailTemplate(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Rise Above</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'EB Garamond', Georgia, serif; background-color: #f9f9f7;">
  <div style="max-width: 600px; margin: 40px auto; padding: 20px;">
    <!-- Main Content Card -->
    <div style="background: white; padding: 50px 40px; border: 1px solid #e5e5e0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #6b7456; font-size: 32px; font-weight: 600; margin: 0 0 10px 0; letter-spacing: 0.5px;">
          Rise Above
        </h1>
        <div style="width: 60px; height: 2px; background: #6b7456; margin: 0 auto;"></div>
      </div>

      <!-- Greeting -->
      <h2 style="color: #4a4a40; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">
        Welcome, ${name}!
      </h2>

      <!-- Main Message -->
      <p style="color: #4a4a40; font-size: 17px; line-height: 1.8; margin-bottom: 20px;">
        Thank you for joining our literary community. We're thrilled to have you here.
      </p>

      <p style="color: #4a4a40; font-size: 17px; line-height: 1.8; margin-bottom: 20px;">
        Rise Above is a curated space where stories come alive—featuring thought-provoking think pieces, 
        captivating short stories, evocative poetry, and real-life narratives that resonate.
      </p>

      <p style="color: #4a4a40; font-size: 17px; line-height: 1.8; margin-bottom: 30px;">
        You'll be among the first to know when we publish new content. We promise to fill your inbox 
        only with stories worth your time.
      </p>

      <!-- Call to Action -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="${process.env.FRONTEND_URL || 'https://yourdomain.com'}" 
           style="display: inline-block; background-color: #6b7456; color: white; text-decoration: none; 
                  padding: 14px 32px; border-radius: 4px; font-size: 16px; font-weight: 600; 
                  letter-spacing: 0.5px; transition: background-color 0.3s;">
          Visit Rise Above
        </a>
      </div>

      <!-- Quote/Tagline -->
      <div style="margin-top: 40px; padding: 25px; background-color: #f9f9f7; border-left: 3px solid #6b7456; border-radius: 2px;">
        <p style="color: #6b7456; font-size: 18px; font-style: italic; margin: 0; line-height: 1.6;">
          "We live and die by the stories we tell."
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding: 0 20px;">
      <p style="color: #8a8a80; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
        Rise Above - A curated space for contemporary literature
      </p>
      <p style="color: #8a8a80; font-size: 13px; line-height: 1.6; margin: 0;">
        <a href="${process.env.FRONTEND_URL || 'https://yourdomain.com'}/unsubscribe" 
           style="color: #8a8a80; text-decoration: underline;">
          Unsubscribe
        </a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate a plain text version of the welcome email
 * This is useful for email clients that don't support HTML
 * @param name - Subscriber's name for personalization
 * @returns Plain text string for the welcome email
 */
export function getWelcomeEmailPlainText(name: string): string {
  return `
Welcome to Rise Above, ${name}!

Thank you for joining our literary community. We're thrilled to have you here.

Rise Above is a curated space where stories come alive—featuring thought-provoking think pieces, 
captivating short stories, evocative poetry, and real-life narratives that resonate.

You'll be among the first to know when we publish new content. We promise to fill your inbox 
only with stories worth your time.

Visit us: ${process.env.FRONTEND_URL || 'https://yourdomain.com'}

"We live and die by the stories we tell."

---
Rise Above - A curated space for contemporary literature

To unsubscribe, visit: ${process.env.FRONTEND_URL || 'https://yourdomain.com'}/unsubscribe
  `.trim();
}
