import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function verifyCaptcha(token: string) {
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

  const data = await response.json();
  return data.success;
}

export async function GET() {
  return NextResponse.json({
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  });
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, company, siteTitle, captchaToken } =
      await request.json();

    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json({ message: 'Invalid captcha' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'Hero Page',
      to: process.env.EMAIL_TO,
      subject: `Contact Form from ${siteTitle} Hero page`,
      text: `
        New contact form submission:
        Email: ${email}
        First Name: ${firstName}
        Last Name: ${lastName}
        Company: ${company}
        Vehicle: ${siteTitle}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in /api/contact route:', error);
    return NextResponse.json(
      { message: 'Error sending email', error: error },
      { status: 500 }
    );
  }
}
