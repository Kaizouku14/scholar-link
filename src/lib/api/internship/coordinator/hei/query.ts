import { ROLE } from "@/constants/users/roles";
import { db, eq, and, isNull, sql } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import { internship as InternshipTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllUserAccount = async ({ userId }: { userId: string }) => {
  try {
    return await db
      .transaction(async (tx) => {
        const coordinator = await tx
          .select({
            department: UserTable.department,
            section: UserTable.section,
          })
          .from(UserTable)
          .where(eq(UserTable.id, userId))
          .limit(1)
          .execute();

        const department = coordinator[0]?.department;
        const section = coordinator[0]?.section;

        const response = await tx
          .select({
            userId: UserTable.id,
            name: UserTable.name,
            middleName: UserTable.middleName,
            surname: UserTable.surname,
            studentNo: StudentTable.studentNo,
            course: StudentTable.course,
            section: UserTable.section,
            yearLevel: StudentTable.yearLevel,
          })
          .from(UserTable)
          .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
          .leftJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
          .where(
            and(
              eq(UserTable.role, ROLE.INTERNSHIP_STUDENT),
              isNull(InternshipTable.userId),
              eq(UserTable.department, department!),
              sql`EXISTS (
                    SELECT 1
                    FROM json_each(${UserTable.section})
                    WHERE value IN (${sql.join(section!, sql`,`)})
                )`,
            ),
          )
          .execute();

        return response;
      })
      .catch((error) => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
