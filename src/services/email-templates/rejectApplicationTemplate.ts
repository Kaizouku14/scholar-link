import { PageRoutes } from "@/constants/page-routes";

export const RejectApplicationTemplate = ({
  programName,
  name,
}: {
  programName: string;
  name: string;
}) => {
  return ` <div style="margin: 0; padding: 0; font-family: 'Poppins', sans-serif; background-color: hsl(0, 0%, 96.1%);">
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
                                    Scholarship Application Update
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
                                    We sincerely appreciate the time and effort you put into your application for the
                                    <strong>${programName}</strong>.
                                    After careful review, we regret to inform you that you have not been selected for
                                    this cycle.
                                </p>
                                <br />
                                <p style="color: hsl(0, 0%, 45.1%); font-size: 16px; margin: 0; line-height: 1.6;">
                                    Please know that this decision was not easy, as we received many strong
                                    applications.
                                    We encourage you to apply again in the future and continue pursuing your academic
                                    goals with dedication and passion.
                                </p>
                            </td>
                        </tr>

                        <!-- Button (Optional: link to other opportunities) -->
                        <tr>
                            <td align="center" style="padding: 16px 0;">
                                <a href="https://sarm-scholar-link.vercel.app/${PageRoutes.SCHOLARSHIPS_PUBLIC}" style="
                display: inline-block;
                padding: 12px 24px;
                font-size: 16px;
                font-weight: bold;
                background-color: hsl(350, 80%, 55%);
                color: white;
                border-radius: 6px;
                text-decoration: none;
              ">
                                    View Other Opportunities
                                </a>
                            </td>
                        </tr>

                        <!-- Closing Note -->
                        <tr>
                            <td align="left" style="padding-top: 24px;">
                                <p style="font-size: 14px; color: hsl(0, 0%, 45.1%); margin: 0; line-height: 1.6;">
                                    Thank you once again for your interest in <strong>ScholarLink</strong>.
                                    We wish you the very best in your future academic journey.
                                </p>
                                <br />
                                <p style="font-size: 14px; color: hsl(0, 0%, 45.1%); margin: 0;">Sincerely,</p>
                                <p style="font-size: 14px; font-weight: bold; color: hsl(0, 0%, 20%); margin: 0;">The
                                    ScholarLink Team</p>
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
    </div>`;
};
