import { db, ne } from "@/server/db";
import { user } from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const getAllUserEmail = async ({ email }: { email: string }) => {
  try {
    const response = await db
      .select({ email: user.email })
      .from(user)
      .where(ne(user.email, email))
      .execute();

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get all user email",
      });
    }

    return response.map((email) => email.email);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all user email," + (error as Error).message,
    });
  }
};
