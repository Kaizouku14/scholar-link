import { db, eq } from "@/server/db";
import {
  user as userTable,
  student as studentTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const checkStudentOnBoarded = async ({ id }: { id: string }) => {
  try {
    const allowedRoles = ["internshipStudent"];
    const [studentOnBoarded] = await db
      .select({
        onboarded: studentTable.onboarded,
        role: userTable.role,
      })
      .from(studentTable)
      .innerJoin(userTable, eq(studentTable.id, userTable.id))
      .where(eq(studentTable.id, id))
      .limit(1);

    if (!studentOnBoarded || !allowedRoles.includes(studentOnBoarded.role!))
      return true;

    return studentOnBoarded.onboarded;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to check student on boarded," + (error as Error).message,
    });
  }
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
