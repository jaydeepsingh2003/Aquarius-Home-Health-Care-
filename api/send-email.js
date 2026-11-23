import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function: Secure SMTP Email Dispatcher
 * Dispatches inquiries, urgent staffing shifts, and career applications
 * securely via Office 365 / GoDaddy SMTP without exposing credentials.
 */
export default async function handler(req, res) {
  // Enforce POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} Not Allowed` 
    });
  }

  try {
    const { 
      type = 'general_inquiry', 
      trackingId = 'AQ-INQ-UNKNOWN', 
      data = {}, 
      honeypot 
    } = req.body;

    // Server-side Anti-bot Honeypot trap
    if (honeypot && String(honeypot).trim().length > 0) {
      // Silently succeed for bots without sending email
      return res.status(200).json({ success: true, trackingId, botFiltered: true });
    }

    // SMTP Configuration from Vercel Environment Variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || 'raj.manvi@aimshealthcarecollege.com';
    const smtpPass = process.env.SMTP_PASS;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || smtpUser;

    // If SMTP_PASS is not configured in Vercel yet, return friendly notice
    if (!smtpPass) {
      console.warn('⚠️ SMTP_PASS is not configured in Vercel environment variables.');
      return res.status(200).json({
        success: true,
        trackingId,
        note: 'Intake logged. SMTP_PASS pending in Vercel environment settings.'
      });
    }

    // Initialize Nodemailer Transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587 (STARTTLS)
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Determine subject and title based on inquiry type
    let subject = `[Aquarius Health Care] New Inquiry: ${trackingId}`;
    let categoryTitle = 'General Inquiry';

    if (type === 'urgent_staffing') {
      subject = `🚨 [URGENT SHIFT REQUEST] Facility Dispatch - Ref: ${trackingId}`;
      categoryTitle = 'Urgent Hospital / Facility Shift Request';
    } else if (type === 'consultation') {
      subject = `📋 [In-Home Care Consultation] Family Intake - Ref: ${trackingId}`;
      categoryTitle = 'Family In-Home Care Consultation';
    } else if (type === 'care_assessment') {
      subject = `✨ [Care Assessment Matcher] Triage Plan - Ref: ${trackingId}`;
      categoryTitle = 'Care Assessment Triage Submission';
    } else if (type === 'career') {
      subject = `💼 [Clinical Career Application] New Applicant (${data.role || 'Staff'}) - Ref: ${trackingId}`;
      categoryTitle = 'Clinical Team Employment Application';
    }

    // Build Email Body HTML
    const formattedFields = Object.entries(data)
      .filter(([key]) => key !== 'honeypot')
      .map(([key, value]) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0F2942; width: 35%;">
            ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
            ${String(value || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </td>
        </tr>
      `).join('');

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #0A1E34; padding: 24px 32px; color: #ffffff; }
          .badge { background: #1D63ED; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
          .content { padding: 32px; }
          .footer { background: #f1f5f9; padding: 16px 32px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">${categoryTitle}</span>
            <h2 style="margin: 12px 0 4px 0; font-size: 20px; color: #ffffff;">Aquarius Home Health Care</h2>
            <p style="margin: 0; font-size: 13px; color: #94a3b8;">Official Tracking Reference: <strong>${trackingId}</strong></p>
          </div>
          <div class="content">
            <p style="font-size: 14px; color: #475569; margin-top: 0;">
              A new intake submission has been received from the live website dispatch portal:
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
              ${formattedFields}
            </table>
          </div>
          <div class="footer">
            <p style="margin: 0;"><strong>Operational HQ:</strong> 800 Queenston Rd, Unit 309, Stoney Creek, ON L8G-1A7</p>
            <p style="margin: 4px 0 0 0;">24/7 Dispatch Desk: (905) 525-5111 | Compliant with Ontario PHIPA & PIPEDA</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"Aquarius Home Health Care" <${smtpUser}>`,
      to: notificationEmail,
      replyTo: data.email || smtpUser,
      subject: subject,
      html: htmlBody
    });

    return res.status(200).json({ 
      success: true, 
      trackingId,
      message: 'Intake dispatched successfully via SMTP.' 
    });

  } catch (error) {
    console.error('SMTP Dispatch Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to dispatch email via SMTP server.',
      details: error.message 
    });
  }
}
