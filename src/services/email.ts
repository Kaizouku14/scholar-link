import {
  createTransport,
  type SentMessageInfo,
  type Transporter,
  type TransportOptions,
} from "nodemailer";
import { env } from "@/env";

export const transporter: Transporter = createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
} as TransportOptions);

if (!transporter) {
  throw new Error("Failed to create transporter");
}

type Email = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

/**
 * Sends an email using the configured SMTP transporter.
 *
 * @param {Email} data The email data
 * @returns {Promise<SentMessageInfo>} The result of the sent email
 */
export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: Email): Promise<SentMessageInfo> => {
  const info: SentMessageInfo = await transporter.sendMail({
    // TODO: Replace with the name of the web application
    from: `"ScholarLink" <${env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  return info;
};
