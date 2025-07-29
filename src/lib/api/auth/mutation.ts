import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import {
  user as userTable,
  verification as verificationTable,
  authorizedEmail as authorizedEmailTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const verifyResetOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const [user] = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

  if (!user)
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });

  const [verifyOTP] = await db
    .select({
      value: verificationTable.value,
      expiresAt: verificationTable.expiresAt,
    })
    .from(verificationTable)
    .where(eq(verificationTable.id, user.id))
    .limit(1);

  if (
    !verifyOTP ||
    verifyOTP.value !== otp ||
    new Date() > new Date(verifyOTP.expiresAt)
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        !verifyOTP || verifyOTP.value !== otp
          ? "Invalid OTP."
          : "OTP has expired.",
    });
  }

  return true;
};

// export const isEmailAuthorized = async ({ email }: { email: string }) => {
//   const [authorizedEmail] = await db
//     .select()
//     .from(authorizedEmailTable)
//     .where(eq(authorizedEmailTable.email, email))
//     .limit(1)
//     .execute();

//   return !!authorizedEmail;
// };

// export const revokeAuthorizedEmail = async ({ email }: { email: string }) => {
//   return await db
//     .delete(authorizedEmailTable)
//     .where(eq(authorizedEmailTable.email, email))
//     .execute();
// };

// export const authorizeEmail = async ({ email }: { email: string }) => {
//   const generatedID = generateUUID();

//   return await db
//     .insert(authorizedEmailTable)
//     .values({
//       id: generatedID,
//       email,
//     })
//     .execute();
// };
