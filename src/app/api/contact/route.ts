import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Input validation interface
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  siteTitle: string;
  captchaToken: string;
}

// Validation function
function validateContactData(data: unknown): data is ContactFormData {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  const { firstName, lastName, email, siteTitle, captchaToken } = obj;
  
  // Check required fields
  if (!firstName || !lastName || !email || !siteTitle || !captchaToken) {
    return false;
  }
  
  // Type check for strings
  if (typeof firstName !== 'string' || typeof lastName !== 'string' || 
      typeof email !== 'string' || typeof siteTitle !== 'string' || 
      typeof captchaToken !== 'string') {
    return false;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Validate string lengths
  if (firstName.length > 50 || lastName.length > 50 || email.length > 100) {
    return false;
  }
  
  return true;
}

async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    if (!response.ok) {
      console.error('reCAPTCHA verification failed:', response.statusText);
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

function createTransporter() {
  const env = process.env as Record<string, string | undefined>;
  
  // Check if OAuth2 credentials are available
  if (env.GMAIL_CLIENT_ID && env.GMAIL_CLIENT_SECRET && env.GMAIL_REFRESH_TOKEN) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: env.EMAIL_USER,
        clientId: env.GMAIL_CLIENT_ID,
        clientSecret: env.GMAIL_CLIENT_SECRET,
        refreshToken: env.GMAIL_REFRESH_TOKEN,
      },
    });
  }
  
  // Fallback to app password (less secure but functional)
  if (env.EMAIL_USER && env.EMAIL_PASS) {
    console.warn('Using app password authentication. Consider switching to OAuth2 for better security.');
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }
  
  throw new Error('Email configuration is incomplete. Please set up OAuth2 or app password credentials.');
}

export async function GET() {
  return NextResponse.json({
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  });
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    
    if (!validateContactData(body)) {
      return NextResponse.json(
        { message: 'Invalid form data provided' },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, company, siteTitle, captchaToken } = body;

    // Verify reCAPTCHA
    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { message: 'Invalid captcha verification' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Sanitize and prepare email content
    const sanitizedFirstName = firstName.trim();
    const sanitizedLastName = lastName.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedCompany = company ? company.trim() : 'Not provided';
    const sanitizedSiteTitle = siteTitle.trim();

    const env = process.env as Record<string, string | undefined>;
    const mailOptions = {
      from: `"${env.EMAIL_FROM_NAME || 'Hero Page'}" <${env.EMAIL_USER}>`,
      to: env.EMAIL_TO,
      subject: `Contact Form Submission - ${sanitizedSiteTitle}`,
      text: `
New contact form submission from ${sanitizedSiteTitle}:

Contact Information:
- First Name: ${sanitizedFirstName}
- Last Name: ${sanitizedLastName}
- Email: ${sanitizedEmail}
- Company: ${sanitizedCompany}
- Vehicle: ${sanitizedSiteTitle}

Submitted at: ${new Date().toISOString()}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Vehicle:</strong> ${sanitizedSiteTitle}</p>
        <hr>
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>First Name:</strong> ${sanitizedFirstName}</li>
          <li><strong>Last Name:</strong> ${sanitizedLastName}</li>
          <li><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></li>
          <li><strong>Company:</strong> ${sanitizedCompany}</li>
        </ul>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      message: 'Contact form submitted successfully',
      success: true 
    });

  } catch (error) {
    console.error('Error in /api/contact route:', error);
    
    // Don't expose internal errors to the client
    return NextResponse.json(
      { 
        message: 'Unable to process your request at this time. Please try again later.',
        success: false 
      },
      { status: 500 }
    );
  }
}
