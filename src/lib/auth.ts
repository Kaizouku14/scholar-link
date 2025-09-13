import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/server/db/schema/auth";
import { admin } from "better-auth/plugins";
import { ROLES } from "@/constants/users/roles";
import { sendEmail } from "@/services/email";
import { linkVerificationTemplate } from "@/services/verfityEmailTemplate";
import { siteConfig } from "@/types/site.config";
import { env } from "@/env";
import { SECTIONS } from "@/constants/users/sections";

export const auth = betterAuth({
  trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL],
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
        html: linkVerificationTemplate({ title: "Reset Password", url }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Email Verification",
        html: linkVerificationTemplate({ title: "Email Verification", url }),
      });
    },
    sendOnSignUp: true,
    expiresIn: 10 * 60 * 1000, //10 minutes
  },
  user: {
    additionalFields: {
      course: { type: "string", required: true },
      section: { type: "string[]", enum: SECTIONS, required: true },
      department: { type: "string", required: true },
      profile: { type: "string", required: false },
    },
  },
  session: {
    expiresIn: 604800, //7 days
    updateAge: 86400, //1 day
  },
  plugins: [
    admin({
      defaultRole: ROLES[0], //Internship Student
      adminRoles: ["scholarship-admin", "internship-admin"],
    }),
  ],
});
