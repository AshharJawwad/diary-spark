import nodemailer from "nodemailer";

export async function sendFeedbackEmail({ name, email, message }) {
  const { SMTP_HOST, SMTP_PORT = "587", SMTP_USER, SMTP_PASSWORD, FEEDBACK_FROM, FEEDBACK_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !FEEDBACK_FROM || !FEEDBACK_TO) {
    throw new Error("Feedback email configuration is incomplete.");
  }
  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid SMTP port.");
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  const result = await transporter.sendMail({
    from: FEEDBACK_FROM,
    to: FEEDBACK_TO,
    replyTo: email,
    subject: "New DiarySpark feedback",
    // Plain text keeps user input out of HTML and email headers.
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  if (!result.accepted?.length || result.rejected?.length) {
    throw new Error("Feedback notification was not accepted.");
  }
}
