import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL_TO;
    if (!toEmail) {
      return Response.json(
        { error: 'Server misconfiguration: recipient email not set.' },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">New message from your portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Name</td>
              <td style="padding: 8px; color: #111;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px; color: #111;"><a href="mailto:${email}">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-left: 4px solid #06b6d4; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; color: #111;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return Response.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: 'Unexpected server error. Please try again.' },
      { status: 500 }
    );
  }
}
