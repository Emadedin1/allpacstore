import { MongoClient } from "mongodb";
import crypto from "crypto";

const client = new MongoClient(process.env.MONGODB_URI);

/**
 * POST /api/auth/password-reset-request
 * Body: { email }
 *
 * - Upserts a passwordResets record { token, email, userId?, expires }
 * - Sends an email via Resend when RESEND_API_KEY is set
 * - Optionally returns debugResetUrl in the response when DEBUG_RESET_LINK === "true"
 */
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Valid email is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await client.connect();
    const db = client.db();

    const normalizedEmail = email.trim().toLowerCase();
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

    // Send via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendApiKey = process.env.RESEND_API_KEY;
        const from = process.env.EMAIL_FROM || "no-reply@example.com";
        const body = {
          from,
          to: normalizedEmail,
          subject: "Reset your password",
          html: `<p>Reset your password using this link:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
          text: `Reset your password using this link:\n\n${resetUrl}`,
        };

        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!r.ok) {
          // Try to read body for debugging
          let errText = await r.text().catch(() => "");
          console.warn("Resend send failed:", r.status, errText);
          // still continue with generic response to the client
        } else {
          console.log("Password reset email queued via Resend for", normalizedEmail);
        }
      } catch (err) {
        console.warn("Resend send exception:", err?.message || err);
      }
    } else {
      // No mailer configured: log the link for testing
      console.log("Password reset link (no mailer configured):", resetUrl);
    }

    // Generic success response. Optionally include debugResetUrl when debugging.
    const debugEnabled = String(process.env.DEBUG_RESET_LINK || "").toLowerCase() === "true";
    const resp = {
      message: "If that email is registered we sent a reset link.",
      ...(debugEnabled ? { debugResetUrl: resetUrl, debugToken: token } : {}),
    };

    return new Response(JSON.stringify(resp), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("password-reset-request error:", err);
    return new Response(JSON.stringify({ error: "Server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // keep DB connection open for reuse if desired
  }
}
