import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const data = await req.formData();
  const name = data.get('name');
  const company = data.get('company');
  const email = data.get('email');
  const phone = data.get('phone');
  const message = data.get('message');

  // Optional: handle file upload if needed

  // Configure your SMTP server credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. 'smtp.gmail.com'
    port: process.env.SMTP_PORT, // e.g. 587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your SMTP login
      pass: process.env.SMTP_PASS, // your SMTP password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: 'm.labak@allpacgroup.com',
      subject: 'New Contact Form Submission',
      text: `
Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
      replyTo: email,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
