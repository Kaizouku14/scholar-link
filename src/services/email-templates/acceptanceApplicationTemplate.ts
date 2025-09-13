export const AcceptanceApplicationTemplate = ({
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
                                    🎉 Congratulations, You’ve Been Accepted!
                                </h2>
                            </td>
                        </tr>

                        <!-- Message -->
                        <tr>
                            <td align="left" style="padding-bottom: 24px;">
                                <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0; line-height: 1.6;">
                                    Dear <strong>${name}</strong>,
                                </p>
                                <br />
                                <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0; line-height: 1.6;">
                                    We are delighted to inform you that your application for the <strong>${programName}</strong> has been <strong>approved</strong>.
                                    Your dedication and effort truly stood out, and we are excited to welcome you as one
                                    of our scholars.
                                </p>
                                <br />
                                <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0; line-height: 1.6;">
                                    You can now log in to the <strong>ScholarLink System</strong> using your registered
                                    account to manage your scholarship.
                                </p>
                            </td>
                        </tr>

                        <!-- Reminder Box -->
                        <tr>
                            <td align="center" style="padding: 16px 0;">
                                <div
                                    style="background-color: hsl(0, 0%, 96.1%); border: 1px solid hsl(0, 0%, 89.8%); border-radius: 6px; padding: 16px; max-width: 400px;">
                                    <p style="margin: 0; font-size: 15px; color: hsl(0, 0%, 30%); line-height: 1.6;">
                                        🔑 Use your registered email to log in. If this is your first time, click
                                        <strong>Forgot Password</strong> to set up your access.
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Closing Note -->
                        <tr>
                            <td align="left" style="padding-top: 24px;">
                                <p style="font-size: 14px; color: hsl(0, 0%, 45.1%); margin: 0; line-height: 1.6;">
                                    We look forward to supporting you in your academic journey.
                                </p>
                                <br />
                                <p style="font-size: 14px; color: hsl(0, 0%, 45.1%); margin: 0;">Best regards,</p>
                                <p style="font-size: 14px; font-weight: bold; color: hsl(0, 0%, 20%); margin: 0;">The
                                    ScholarLink Team</p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding-top: 32px; border-top: 1px solid hsl(0, 0%, 89.8%);">
                                <p style="font-size: 12px; color: hsl(0, 0%, 63.9%); margin: 0;">
                                    &copy; 2025 ScholarLink. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </div>
`;
