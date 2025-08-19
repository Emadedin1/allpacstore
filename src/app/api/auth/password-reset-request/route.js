import { MongoClient } from "mongodb";
import crypto from "crypto";

const client = new MongoClient(process.env.MONGODB_URI);

/**
 * POST /api/auth/password-reset-request
 * Body: { email }
 *
 * - Creates/updates a passwordResets record { token, email, userId?, expires }
 * - Logs the reset URL when no mailer is configured, or attempts to send via SendGrid.
 * - Returns a generic success message so callers can't enumerate accounts.
 */
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Valid email is required." }), { status: 400 });
    }

    await client.connect();
    const db = client.db();

    const normalizedEmail = email.trim().toLowerCase();

    // Optionally attach userId if user exists
    const user = await db.collection("users").findOne({ email: normalizedEmail });

    // Create token & expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour

    const resetDoc = {
      token,
      email: normalizedEmail,
      expires,
      createdAt: Date.now(),
    };
    if (user && user._id) resetDoc.userId = user._id;

    // Upsert the reset record by email
    await db.collection("passwordResets").updateOne(
      { email: normalizedEmail },
      { $set: resetDoc },
      { upsert: true }
    );

    // Build reset URL
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
    const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

    // If SendGrid configured, send mail; use dynamic import to avoid require()/ESLint errors
    if (process.env.SENDGRID_API_KEY) {
      try {
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
      // No mailer configured: log the link for testing
      console.log("Password reset link (no mailer configured):", resetUrl);
    }

    // Generic response
    return new Response(JSON.stringify({ message: "If that email is registered we sent a reset link." }), { status: 200 });
  } catch (err) {
    console.error("password-reset-request error:", err);
    return new Response(JSON.stringify({ error: "Server error." }), { status: 500 });
  } finally {
    // keep DB connection open for reuse if desired
  }
}
