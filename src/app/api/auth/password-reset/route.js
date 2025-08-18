import { Resend } from 'resend';
import crypto from 'crypto';
import { MongoClient } from 'mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);
const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required.' }),
        { status: 400 }
      );
    }

    // 1. Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour from now

    // 2. Save the token to your database
    await client.connect();
    const db = client.db(); // Use default DB
    await db.collection('passwordResets').insertOne({
      email,
      token,
      expires,
    });

    // 3. Create the reset password link
    const passwordResetLink = `https://allpacstore.com/reset-password?token=${token}`;

    // 4. Send the reset email
    const emailRes = await resend.emails.send({
      from: 'noreply@allpacstore.com', // Make sure this is verified in Resend
      to: email,
      subject: 'Reset your password',
      html: `<a href="${passwordResetLink}">Click here to reset your password</a>`,
    });

    if (emailRes.error) {
      console.error("Resend API error:", emailRes.error);
      return new Response(
        JSON.stringify({ error: "Failed to send reset email." }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Password reset error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send password reset email." }),
      { status: 500 }
    );
  } finally {
    // Optionally close client if not re-used elsewhere
    // await client.close();
  }
}
