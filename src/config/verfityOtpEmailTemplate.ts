export const linkVerificationTemplate = ({ url }: { url: string }) => {
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
                  <h2 style="color: hsl(240, 6%, 10%); font-size: 22px; margin: 0;">Reset Your Password</h2>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td align="center" style="padding-bottom: 24px;">
                  <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0;">
                    Click the button below to reset your password. This link will expire in 10 minutes.
                  </p>
                </td>
              </tr>

              <!-- Button -->
              <tr>
                <td align="center" style="padding: 16px 0;">
                  <a href="${url}" style="
                    display: inline-block;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: bold;
                    background-color: hsl(350, 80%, 55%);
                    color: white;
                    border-radius: 6px;
                    text-decoration: none;
                  ">
                    Reset Password
                  </a>
                </td>
              </tr>

              <!-- Note -->
              <tr>
                <td align="center" style="padding-top: 24px;">
                  <p style="font-size: 14px; color: hsl(0, 0%, 45.1%); margin: 0;">
                    Didn't request this? You can safely ignore this email.
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
