import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/server/db/schema/auth";
import { admin, emailOTP } from "better-auth/plugins";
import { ROLES } from "@/constants/roles";
import { sendEmail } from "@/services/email";
import { otpEmailTemplate } from "@/config/verfityOtpEmailTemplate";
import { siteConfig } from "@/config/site.config";

export const auth = betterAuth({
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
  },
  user: {
    additionalFields: {
      surname: { type: "string", required: true },
      middleName: { type: "string", required: true },
    },
  },
  plugins: [
    admin({
      defaultRole: ROLES[0], //Internship Student
      adminRoles: ["scholarship-admin", "internship-admin"],
    }),
  ],
});
