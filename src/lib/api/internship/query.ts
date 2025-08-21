import type { departmentType } from "@/constants/users/departments";
import { ROLE, type roleType } from "@/constants/users/roles";
import type { SectionType } from "@/constants/users/sections";
import type { Interns } from "@/interfaces/internship/interns";
import {
  db,
  eq,
  countDistinct,
  sum,
  and,
  max,
  isNull,
  sql,
  isNotNull,
} from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  progressLog as ProgressTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllInternships = async ({
  role,
  userId,
}: {
  role: roleType;
  userId: string;
}) => {
  return await db
    .transaction(async (tx) => {
      let coordinatorSections: SectionType[] = [];
      let coordinatorDeparment: departmentType | null = null;

      // If coordinator → get their sections first
      if (role === ROLE.INTERNSHIP_COORDINATOR) {
        const [coordinator] = await tx
          .select({
            section: UserTable.section,
            department: UserTable.department,
          })
          .from(UserTable)
          .where(eq(UserTable.id, userId))
          .limit(1);

        coordinatorSections = coordinator?.section ?? [];
        coordinatorDeparment = coordinator!.department;
      }

      const baseQuery = tx
        .select({
          companyId: CompanyTable.companyId,
          companyName: max(CompanyTable.name),
          address: max(CompanyTable.address),
          supervisor: max(SupervisorTable.name),
          supervisorEmail: max(SupervisorTable.email),
          //   supervisorNo: max(SupervisorTable.contactNo),
          studentCount: countDistinct(InternshipTable.userId),
          totalProgressHours: sum(ProgressTable.hours),
          department: UserTable.department,
          interns: sql<string>`
            json_group_array(
              DISTINCT json_object(
                'name', ${UserTable.name},
                'middleName', ${UserTable.middleName},
                'surname', ${UserTable.surname},
                'profile', ${UserTable.profile},
                'email', ${UserTable.email},
                'section', ${UserTable.section},
                'status', ${InternshipTable.status}
              )
            )
          `.as("interns"),
        })
        .from(CompanyTable)
        .innerJoin(
          InternshipTable,
          eq(InternshipTable.companyId, CompanyTable.companyId),
        )
        .leftJoin(
          SupervisorTable,
          eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
        )
        .leftJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
        .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
        .leftJoin(
          ProgressTable,
          eq(ProgressTable.internshipId, InternshipTable.internshipId),
        )
        .groupBy(CompanyTable.companyId);

      // If coordinator has sections
      let query;
      if (
        role === ROLE.INTERNSHIP_COORDINATOR &&
        coordinatorSections.length > 0
      ) {
        query = baseQuery.where(
          and(
            isNotNull(InternshipTable.userId),
            sql`EXISTS (
                        SELECT 1
                        FROM json_each(${UserTable.section})
                        WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
                    )`,
            eq(UserTable.department, coordinatorDeparment!),
          ),
        );
      } else {
        query = baseQuery;
      }

      const response = await query.execute();
      return response.map((row) => ({
        ...row,
        interns: row.interns ? (JSON.parse(row.interns) as Interns[]) : [],
      }));
    })
    .catch((error) => {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get interns: " + (error as Error).message,
      });
    });
};

export const getAllUserAccount = async ({
  role,
  department,
}: {
  role: roleType;
  department: departmentType;
}) => {
  try {
    const conditions = [
      eq(UserTable.role, ROLE.INTERNSHIP_STUDENT),
      isNull(InternshipTable.userId),
    ];

    if (role === ROLE.INTERNSHIP_COORDINATOR) {
      conditions.push(eq(UserTable.department, department));
    }

    const response = await db
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
      .where(and(...conditions))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};

export const getCompanyRecords = async () => {
  try {
    const response = await db
      .select({
        id: CompanyTable.companyId,
        name: CompanyTable.name,
        address: CompanyTable.address,
      })
      .from(CompanyTable)
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
