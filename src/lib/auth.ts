import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/server/db/schema/auth";
import { admin } from "better-auth/plugins";
import { ROLES } from "@/constants/roles";
import { sendEmail } from "@/services/email";
import { linkVerificationTemplate } from "@/config/verfityOtpEmailTemplate";
import { siteConfig } from "@/config/site.config";
import { env } from "@/env";

export const auth = betterAuth({
  trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL!],
  appName: siteConfig.title,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 10 * 60 * 1000, //10 minutes
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Password ",
        html: linkVerificationTemplate({ url }),
      });
    },
  },
  user: {
    additionalFields: {
      surname: { type: "string", required: true },
      middleName: { type: "string", required: true },
      department: { type: "string", required: true },
      profile: { type: "string", required: false },
    },
  },
  plugins: [
    admin({
      defaultRole: ROLES[0], //Internship Student
      adminRoles: ["scholarship-admin", "internship-admin"],
    }),
  ],
});
