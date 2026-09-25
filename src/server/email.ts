import nodemailer from 'nodemailer';

export interface EmailPayload {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
}

export async function sendLeadNotification(payload: EmailPayload): Promise<{ success: boolean; provider: string }> {
  const provider = (process.env.EMAIL_PROVIDER || 'console').toLowerCase();
  const toEmail = process.env.NOTIFICATION_TO_EMAIL || 'sajjad2003khan@gmail.com';
  const subject = `🔥 New Lead: ${payload.name} (${payload.projectType})`;

  const textBody = `
New inquiry received via Sajjad Khan Portfolio:

Name: ${payload.name}
Email: ${payload.email}
Project Type: ${payload.projectType}
Budget: ${payload.budget || 'Not specified'}

Message:
${payload.message}

---
Sent automatically from the Portfolio Contact System.
  `.trim();

  // 1. Resend Provider
  if (provider === 'resend' && process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.NOTIFICATION_FROM_EMAIL || 'onboarding@resend.dev',
          to: [toEmail],
          reply_to: payload.email,
          subject,
          text: textBody,
        }),
      });

      if (res.ok) {
        return { success: true, provider: 'resend' };
      }
      console.warn('Resend API returned non-ok status:', await res.text());
    } catch (err) {
      console.warn('Failed to send email via Resend:', err);
    }
  }

  // 2. Nodemailer (SMTP) Provider
  if (provider === 'nodemailer' && process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: toEmail,
        replyTo: payload.email,
        subject,
        text: textBody,
      });

      return { success: true, provider: 'nodemailer' };
    } catch (err) {
      console.warn('Failed to send email via Nodemailer:', err);
    }
  }

  // 3. Fallback: Console Logging (Safe, doesn't throw, perfect for local/dev)
  console.log('📧 [CONTACT INQUIRY NOTIFICATION]');
  console.log(`To: ${toEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${textBody}`);
  console.log('----------------------------------------------------');

  return { success: true, provider: 'console' };
}
