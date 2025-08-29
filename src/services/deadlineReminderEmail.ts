import { formatText } from "@/lib/utils";
import { format } from "date-fns";

export const deadlineReminderEmailTemplate = ({
  name,
  missingDocuments,
  deadline,
}: {
  name: string;
  missingDocuments: string[];
  deadline: Date;
}) => {
  return `
  <div style="margin: 0; padding: 0; font-family: 'Poppins', sans-serif; background-color: hsl(0, 0%, 96.1%);">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background-color: hsl(0, 0%, 100%); border-radius: 10px; border: 1px solid hsl(0, 0%, 89.8%); padding: 32px;">

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 16px;">
                <div style="font-size: 24px; font-weight: 700;">
                  <span style="color: hsl(0, 0%, 3.9%);">Scholar</span>
                  <span style="color: hsl(350, 80%, 55%);">Link</span>
                </div>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding-bottom: 16px;">
                <h2 style="color: hsl(240, 6%, 10%); font-size: 22px; margin: 0;">
                  Document Submission Reminder
                </h2>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding-bottom: 16px;">
                <p style="color: hsl(0, 0%, 3.9%); font-size: 16px; margin: 0;">
                  Hi ${name},
                </p>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding-bottom: 24px;">
                <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0;">
                  This is a reminder that you still need to submit the following documents before the deadline:
                </p>
              </td>
            </tr>

            <!-- Missing Documents List -->
            <tr>
              <td style="padding-bottom: 24px;">
                <ul style="text-align: left; color: hsl(0, 0%, 3.9%); font-size: 15px; padding-left: 20px; margin: 0;">
                  ${missingDocuments.map((doc) => `<li>${formatText(doc)}</li>`).join("")}
                </ul>
              </td>
            </tr>

            <!-- Deadline Highlight -->
            <tr>
              <td align="center" style="padding: 16px 0;">
                <div style="
                  display: inline-block;
                  padding: 12px 24px;
                  font-size: 16px;
                  font-weight: bold;
                  background-color: hsl(350, 80%, 55%);
                  color: white;
                  border-radius: 6px;
                ">
                  Deadline: ${format(deadline, "MMM dd, yyyy")}
                </div>
              </td>
            </tr>

            <!-- Note -->
            <tr>
              <td align="center" style="padding-top: 24px;">
                <p style="font-size: 14px; color: hsl(0, 0%, 45.1%); margin: 0;">
                  Please ensure your documents are submitted on time to avoid delays.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top: 32px; border-top: 1px solid hsl(0, 0%, 89.8%);">
                <p style="font-size: 12px; color: hsl(0, 0%, 63.9%); margin: 0;">
                  &copy; ${new Date().getFullYear()} ScholarLink. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
};
