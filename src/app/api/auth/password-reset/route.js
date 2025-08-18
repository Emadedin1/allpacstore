import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();

  // TODO: Generate a real secure token for password reset (use your user DB/auth logic)
  const passwordResetLink = `https://yourdomain.com/reset-password?token=EXAMPLE_TOKEN`;

  // Send the reset email
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    html: `<a href="${passwordResetLink}">Click here to reset your password</a>`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
