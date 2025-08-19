import { MongoClient } from "mongodb";
import crypto from "crypto";

const client = new MongoClient(process.env.MONGODB_URI);

/**
 * POST /api/auth/password-reset-request
 * Body: { email }
 *
 * - Creates/updates a passwordResets record { token, email, userId?, expires }
 * - Logs the reset URL when no mailer is configured, or tries to send via SendGrid if configured.
 * - Returns a generic success message so the API does not reveal whether the email exists.
 */
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Valid email is required." }), { status: 400 });
    }

    await client.connect();
    const db = client.db();

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Try to find the user to optionally attach userId
    const user = await db.collection("users").findOne({ email: normalizedEmail });

    // Create a secure token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour

    const resetDoc = {
      token,
      email: normalizedEmail,
      expires,
      createdAt: Date.now(),
    };
    if (user && user._id) resetDoc.userId = user._id;

    // Upsert reset record by email (replace any existing one)
    await db.collection("passwordResets").updateOne(
      { email: normalizedEmail },
      { $set: resetDoc },
      { upsert: true }
    );

    // Build reset URL for sending/logging
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
    const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

    // Try to send email via SendGrid if configured (adapt if you use a different provider)
    if (process.env.SENDGRID_API_KEY) {
      try {
        // Use dynamic import instead of require() so ESLint doesn't complain
        const sgMailModule = await import("@sendgrid/mail");
        const sgMail = sgMailModule?.default || sgMailModule;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({
          to: normalizedEmail,
          from: process.env.EMAIL_FROM || "no-reply@example.com",
          subject: "Reset your password",
          text: `Reset your password using this link:\n\n${resetUrl}`,
          html: `<p>Reset your password using this link:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
        });
        console.log("Password reset email sent to", normalizedEmail);
      } catch (err) {
        console.warn("SendGrid send failed:", err?.message || err);
      }
    } else {
      // No mailer configured: log the URL so you can test manually
      console.log("Password reset link (no mailer configured):", resetUrl);
    }

    // Always return a generic message
    return new Response(JSON.stringify({ message: "If that email is registered we sent a reset link." }), { status: 200 });
  } catch (err) {
    console.error("password-reset-request error:", err);
    return new Response(JSON.stringify({ error: "Server error." }), { status: 500 });
  } finally {
    // keep DB connection open for reuse; close if you prefer:
    // await client.close();
  }
}
