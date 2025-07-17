import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/server/db/schema/auth";
import { admin } from "better-auth/plugins/admin";
import { additionalFields } from "./utils";
import { ROLES } from "@/constants/roles";
// import { ac, roles } from "./permission";

export const auth = betterAuth({
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
    additionalFields,
  },
  plugins: [
    admin({
      defaultRole: ROLES[0], //Internship Student
      adminRoles: ["scholarship-admin", "internship-admin"],
      //   ac,
      //   roles: {
      //     ...roles,
      //   },   
    }),
  ],
});
