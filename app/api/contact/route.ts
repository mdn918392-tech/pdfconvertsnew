import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, rating } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          message: 'Name, email, and message are required',
        },
        { status: 400 }
      );
    }

    // Get Gmail credentials from environment variables
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    console.log(
      '📧 EMAIL_USER:',
      user ? user : '❌ NOT SET'
    );

    console.log(
      '🔑 EMAIL_PASS:',
      pass ? `✅ Loaded (${pass.length} chars)` : '❌ NOT SET'
    );

    // Check credentials
    if (!user || !pass) {
      console.error('❌ Missing email credentials in .env.local');

      return NextResponse.json(
        {
          message:
            'Server configuration error. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    console.log('✅ SMTP connection verified successfully');

    // Safely handle rating
    const numericRating =
      typeof rating === 'number'
        ? Math.min(Math.max(rating, 0), 5)
        : 0;

    const stars =
      numericRating > 0
        ? '⭐'.repeat(numericRating)
        : 'No rating';

    // Email options
    const mailOptions = {
      from: user,

      // Contact form emails will be received here
      to: 'pdfswift94@gmail.com',

      subject: subject
        ? `PDFSwift Contact: ${subject}`
        : 'PDFSwift Contact Form Submission',

      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

            <h2 style="color: #6d28d9;">
              New Contact Form Submission
            </h2>

            <hr />

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Subject:</strong>
              ${subject || 'N/A'}
            </p>

            <p>
              <strong>Rating:</strong>
              ${stars} (${numericRating}/5)
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div
              style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                white-space: pre-wrap;
              "
            >
              ${message}
            </div>

            <hr />

            <p style="font-size: 12px; color: #777;">
              This message was sent from the PDFSwift contact form.
            </p>

          </body>
        </html>
      `,

      // When you click Reply, reply will go to the user
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(
      '✅ Email sent successfully to pdfswift94@gmail.com'
    );

    return NextResponse.json(
      {
        message: 'Email sent successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Email send error:', error);

    let errorMessage =
      'Failed to send email. Please try again later.';

    if (error?.code === 'EAUTH') {
      errorMessage =
        'Authentication failed. Please check your Gmail App Password.';
    } else if (error?.code === 'ESOCKET') {
      errorMessage =
        'Network error. Please check your internet connection.';
    } else if (error?.code === 'ECONNECTION') {
      errorMessage =
        'Could not connect to Gmail SMTP server.';
    }

    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}