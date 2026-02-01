import { Resend } from 'resend';
import { getWelcomeEmailTemplate } from '../templates/welcomeEmail.js';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.com';

/**
 * Send a welcome email to a new subscriber
 * @param email - Subscriber's email address
 * @param name - Subscriber's name
 * @returns Promise that resolves with email send result
 */
export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return { success: false, error: 'Email service not configured' };
    }

    // Get the HTML email template
    const htmlContent = getWelcomeEmailTemplate(name);

    // Send the email
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to Rise Above',
      html: htmlContent,
    });

    console.log('Welcome email sent successfully:', { 
      email, 
      messageId: data.id 
    });

    return { success: true };
  } catch (error) {
    // Log the error but don't throw - we don't want email failures to break subscriptions
    console.error('Failed to send welcome email:', {
      email,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send an unsubscribe confirmation email
 * @param email - Subscriber's email address
 * @param name - Subscriber's name
 * @returns Promise that resolves with email send result
 */
export async function sendUnsubscribeConfirmation(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return { success: false, error: 'Email service not configured' };
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'EB Garamond', Georgia, serif; background-color: #f9f9f7;">
          <div style="max-width: 600px; margin: 40px auto; padding: 40px 20px;">
            <div style="background: white; padding: 40px; border: 1px solid #e5e5e0; border-radius: 4px;">
              <h1 style="color: #6b7456; font-size: 28px; margin-bottom: 20px; text-align: center;">
                You've Been Unsubscribed
              </h1>
              <p style="color: #4a4a40; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Hello ${name},
              </p>
              <p style="color: #4a4a40; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We've successfully removed you from our mailing list. You won't receive any more emails from us.
              </p>
              <p style="color: #4a4a40; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                If this was a mistake, you can always resubscribe on our website.
              </p>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e0; text-align: center;">
                <p style="color: #8a8a80; font-size: 14px; margin: 0;">
                  Rise Above - We live and die by the stories we tell
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Unsubscribe Confirmation - Rise Above',
      html: htmlContent,
    });

    console.log('Unsubscribe confirmation email sent:', { 
      email, 
      messageId: data.id 
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send unsubscribe confirmation:', {
      email,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
