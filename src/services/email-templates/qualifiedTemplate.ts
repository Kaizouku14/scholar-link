export const QualifiedApplicationTemplate = ({
  programName,
  name,
}: {
  programName: string;
  name: string;
}) => `
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
                You’re Qualified for the Next Stage
              </h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding-bottom: 24px;">
              <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0; line-height: 1.6;">
                Dear <strong>${name}</strong>,<br /><br />
                Congratulations! You have been <strong>qualified</strong> for the next stage of the
                <strong>${programName}</strong> application process.<br /><br />
                At this point, you <strong>may be invited for an interview</strong>, depending on the program requirements. If an interview is required, you will receive further details and scheduling instructions by email.<br /><br />
                Please make sure to check your inbox regularly and keep your contact information up to date so you don’t miss any important updates.<br /><br />
                We are excited about your progress in the <strong>${programName}</strong> and will be in touch with the next steps soon.
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
