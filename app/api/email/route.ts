import { NextResponse } from "next/server";
import { transporter } from "@/lib/nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: Request) {
  try {
    // declear variables
    const { name, email, subject, message } = await request.json();

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }
    // verify
    try {
      await transporter.verify();
      console.log("Server is ready to take our messages");
    } catch (err) {
      console.error("Verification failed:", err);
    }

    // define email options
    // 2. Define Email Options
    const mailOptions: Mail.Options = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Recommended format to avoid spam filters
      to: process.env.SMTP_USER,
      subject: `[Contact Form] ${subject || "New Inquiry from " + name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <h3 style="color: #555;">Message:</h3>
          <p style="white-space: pre-wrap; color: #333;">${message}</p>
        </div>
      `,
    };

    // 3. Dispatch Email
    transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Nodemailer API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try" },
      { status: 500 },
    );
  }
}
