import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

/**
 * POST /api/auth/password-reset
 * Body: { token, password, email? }
 *
 * Behavior:
 * - Prefer the email stored on the password reset record (reset.email).
 * - If reset.email is missing but reset.userId exists, look up the user by _id and use their email.
 * - If neither is available, fall back to the email provided in the request body (bodyEmail).
 * - Hash the new password and update the user's document. If update fails but reset.userId exists,
 *   try updating by _id as a fallback.
 */
export async function POST(req) {
  try {
    const { token, password, email: bodyEmail } = await req.json();

    if (!token || !password) {
      return new Response(JSON.stringify({ error: "Token and new password are required." }), { status: 400 });
    }

    await client.connect();
    const db = client.db();

    // Find reset record by token
    const reset = await db.collection("passwordResets").findOne({ token });
    if (!reset) {
      return new Response(JSON.stringify({ error: "Invalid or expired token." }), { status: 400 });
    }

    // Expiry check (if your records use expires as a timestamp)
    if (reset.expires && Date.now() > reset.expires) {
      await db.collection("passwordResets").deleteOne({ token });
      return new Response(JSON.stringify({ error: "Token expired." }), { status: 400 });
    }

    // Determine email to use
    let email = reset.email || null;

    // If no email on reset record, try to resolve from reset.userId
    if (!email && reset.userId) {
      try {
        const userId = typeof reset.userId === "string" ? new ObjectId(reset.userId) : reset.userId;
        const user = await db.collection("users").findOne({ _id: userId });
        if (user && user.email) {
          email = user.email;
        }
      } catch (err) {
        console.warn("Could not resolve reset.userId to a user:", err?.message || err);
        // continue to other fallbacks
      }
    }

    // Fallback to email supplied by client (less ideal but supported)
    if (!email && bodyEmail) {
      email = bodyEmail;
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required and token is not linked to a user." }), { status: 400 });
    }

    // Hash new password and update user by email
    const hashed = await bcrypt.hash(password, 10);
    let updateRes = await db.collection("users").updateOne(
      { email },
      { $set: { password: hashed } }
    );

    // If no user matched by email but we have a userId, try updating by _id
    if (updateRes.matchedCount === 0 && reset.userId) {
      try {
        const userId = typeof reset.userId === "string" ? new ObjectId(reset.userId) : reset.userId;
        updateRes = await db.collection("users").updateOne(
          { _id: userId },
          { $set: { password: hashed } }
        );
      } catch (err) {
        console.warn("Fallback update by userId failed:", err?.message || err);
      }
    }

    if (updateRes.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found." }), { status: 404 });
    }

    // Delete token record to prevent reuse
    await db.collection("passwordResets").deleteOne({ token });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("reset-password error:", err);
    return new Response(JSON.stringify({ error: "Server error." }), { status: 500 });
  } finally {
    // keep DB connection open for reuse in serverless environments, or close if you prefer:
    // await client.close();
  }
}
