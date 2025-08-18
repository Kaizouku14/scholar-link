import { ROLE } from "@/constants/roles";
import {
  countDistinct,
  db,
  eq,
  sql,
  sum,
  ne,
  and,
  max,
  like,
  not,
} from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  progressLog as ProgressTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllInternshipDeparments = async () => {
  try {
    const response = await db
      .select({
        deparment: UserTable.department,
        coordinators: sql<number>`COUNT(DISTINCT ${UserTable.id}) FILTER (WHERE ${UserTable.role} = ${ROLE.INTERNSHIP_COORDINATOR})`,
        interns: countDistinct(InternshipTable.userId),
        requiredHours: max(InternshipTable.totalOfHoursRequired),
        totalProgressHours: sum(ProgressTable.hours),
        users: sql`
            json_group_array(
                DISTINCT json_object(
                'name', ${UserTable.name},
                'middleName', ${UserTable.middleName},
                'surname', ${UserTable.surname},
                'profile', ${UserTable.profile},
                'role', ${UserTable.role},
                'email', ${UserTable.email},
                'course', ${StudentTable.course},
                'yearLevel', ${StudentTable.yearLevel},
                'section', ${StudentTable.section},
                'studentNo', ${StudentTable.studentNo},
                'status', ${InternshipTable.status}
                )
            )
        `.as("users"),
      })
      .from(UserTable)
      .leftJoin(InternshipTable, eq(InternshipTable.userId, UserTable.id))
      .leftJoin(StudentTable, eq(StudentTable.id, UserTable.id))
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .where(
        and(
          ne(UserTable.role, ROLE.INTERNSHIP_ADMIN),
          not(like(UserTable.role, "scholarship%")),
        ),
      )
      .groupBy(UserTable.department)
      .execute();

    return response.map((row) => ({
      ...row,
      users: row.users ? JSON.parse(row.users as string) : [],
    }));
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to get all internship deparments," + (error as Error).message,
    });
  }
};
