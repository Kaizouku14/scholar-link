import { db, not, eq, sql, like } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";

export const gellAllInternshipAccounts = async () => {
  try {
    const response = await db
      .select({
        id: UserTable.id,
        name: UserTable.name,
        profile: UserTable.profile,
        email: UserTable.email,
        role: UserTable.role,
        section: UserTable.section,
        course: StudentTable.course,
        yearLevel: StudentTable.yearLevel,
        status: sql<string>`CASE WHEN EXISTS (
        SELECT 1 FROM sl_authorized_email ae WHERE ae.email = ${UserTable.email}
        ) THEN 'verified' ELSE 'revoked' END`,
      })
      .from(UserTable)
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .where(not(like(UserTable.role, "scholarship%")))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to get all internship accounts," + (error as Error).message,
    });
  }
};
