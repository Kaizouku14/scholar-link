import { ROLE } from "@/constants/users/roles";
import { db, eq, and, sql, isNotNull, isNull, or } from "@/server/db";
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
import type { CoordinatorSectionData } from "@/interfaces/internship/hei";
import { getCoordinatorInfo } from "../query";

export const getCoordinatorSections = async (
  userId: string,
): Promise<CoordinatorSectionData[]> => {
  return await db.transaction(async (tx) => {
    const [coordinator] = await tx
      .select({
        section: UserTable.section,
        course: UserTable.course,
        department: UserTable.department,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId))
      .limit(1);

    const coordinatorSections = coordinator?.section ?? [];
    const coordinatorDepartment = coordinator!.department;
    const coordinatorCourse = coordinator?.course;

    const response = await tx
      .select({
        internshipId: InternshipTable.internshipId,
        section: UserTable.section,
        department: UserTable.department,
        name: UserTable.name,
        profile: UserTable.profile,
        email: UserTable.email,
        course: UserTable.course,
        status: InternshipTable.status,
        companyName: CompanyTable.name,
        companyAddress: CompanyTable.address,
        supervisorName: SupervisorTable.name,
        supervisorEmail: SupervisorTable.email,
        supervisorContactNo: SupervisorTable.contactNo,
      })
      .from(UserTable)
      .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .leftJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .leftJoin(
        SupervisorTable,
        eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
      )
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .where(
        and(
          isNotNull(InternshipTable.userId),
          sql`EXISTS (
            SELECT 1
            FROM json_each(${UserTable.section})
            WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
          )`,
          eq(UserTable.course, coordinatorCourse!),
          eq(UserTable.department, coordinatorDepartment!),
        ),
      );

    return response;
  });
};

export const getAllUserAccount = async ({ userId }: { userId: string }) => {
  try {
    const { coordinatorSections, coordinatorDepartment, coordinatorCourse } =
      await getCoordinatorInfo({ userId });

    return await db
      .transaction(async (tx) => {
        const response = await tx
          .select({
            userId: UserTable.id,
            name: UserTable.name,
            course: UserTable.course,
            section: UserTable.section,
            yearLevel: StudentTable.yearLevel,
          })
          .from(UserTable)
          .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
          .leftJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
          .where(
            and(
              eq(UserTable.role, ROLE.INTERNSHIP_STUDENT),
              or(
                isNull(InternshipTable.userId),
                eq(InternshipTable.status, "canceled"),
              ),
              eq(UserTable.department, coordinatorDepartment!),
              sql`EXISTS (
                    SELECT 1
                    FROM json_each(${UserTable.section})
                    WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
                )`,
              eq(UserTable.course, coordinatorCourse!),
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
