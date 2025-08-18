import { Resend } from 'resend';
import crypto from 'crypto';
import { MongoClient } from 'mongodb'; // or your DB of choice

const resend = new Resend(process.env.RESEND_API_KEY);

// Set up your DB connection (for demo, adjust for production)
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(); // use default DB

export async function POST(req) {
  const { email } = await req.json();

  // 1. Generate a secure random token
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 1000 * 60 * 60; // 1 hour from now

  // 2. Save the token to your database
  await client.connect();
  await db.collection('passwordResets').insertOne({
    email,
    token,
    expires,
  });

  // 3. Create the reset password link
  const passwordResetLink = `https://yourdomain.com/reset-password?token=${token}`;

  // 4. Send the reset email
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    html: `<a href="${passwordResetLink}">Click here to reset your password</a>`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
