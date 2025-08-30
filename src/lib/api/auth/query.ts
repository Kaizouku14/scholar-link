import { db, not, eq, sql, like, and, or } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import { ROLE } from "@/constants/users/roles";
import type { SectionType } from "@/constants/users/sections";

export const gellAllInternshipAccounts = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db.transaction(async (tx) => {
    const [user] = await tx
      .select({
        role: UserTable.role,
        section: UserTable.section,
        department: UserTable.department,
        course: UserTable.course,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId))
      .limit(1)
      .execute();

    const role = user?.role;
    const assignedSections: SectionType[] = user?.section ?? [];
    const department = user?.department;
    const course = user?.course;

    const conditions = [not(like(UserTable.role, "scholarship%"))];

    if (role === ROLE.INTERNSHIP_COORDINATOR) {
      conditions.push(
        eq(UserTable.department, department!),
        eq(UserTable.course, course!),
        eq(UserTable.role, ROLE.INTERNSHIP_STUDENT),
        sql`EXISTS (
                SELECT 1
                FROM json_each(${UserTable.section})
                WHERE value IN (${sql.join(assignedSections, sql`,`)})
            )`,
      );
    } else {
      conditions.push(eq(UserTable.role, ROLE.INTERNSHIP_COORDINATOR));
    }

    const response = await db
      .select({
        id: UserTable.id,
        name: UserTable.name,
        profile: UserTable.profile,
        email: UserTable.email,
        role: UserTable.role,
        section: UserTable.section,
        course: UserTable.course,
        yearLevel: StudentTable.yearLevel,
        status: sql<string>`CASE WHEN EXISTS (
        SELECT 1 FROM sl_authorized_email ae WHERE ae.email = ${UserTable.email}
        ) THEN 'verified' ELSE 'revoked' END`,
      })
      .from(UserTable)
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .where(or(and(...conditions), eq(UserTable.id, userId)))
      .execute();

    return response;
  });
};
