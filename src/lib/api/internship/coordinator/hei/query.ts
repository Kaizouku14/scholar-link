import { db, eq, and, sql, isNotNull } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";
import type { CoordinatorSectionData } from "@/interfaces/internship/hei";
import { getCoordinatorInfo } from "../query";

export const getCoordinatorSections = async (
  userId: string,
): Promise<CoordinatorSectionData[]> => {
  try {
    const { coordinatorSections, coordinatorDepartment, coordinatorCourse } =
      await getCoordinatorInfo({ userId });

    return await db
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
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};

export const getAllUserAccount = async ({ userId }: { userId: string }) => {
  try {
    const { coordinatorSections, coordinatorDepartment, coordinatorCourse } =
      await getCoordinatorInfo({ userId });

    return await db
      .selectDistinct({
        userId: UserTable.id,
        name: UserTable.name,
        course: UserTable.course,
        section: UserTable.section,
      })
      .from(UserTable)
      .leftJoin(StudentTable, eq(StudentTable.id, UserTable.id))
      .leftJoin(InternshipTable, eq(InternshipTable.userId, UserTable.id))
      .where(
        and(
          eq(UserTable.department, coordinatorDepartment!),
          eq(UserTable.course, coordinatorCourse!),
          sql`EXISTS (
                SELECT 1
                FROM json_each(${UserTable.section})
                WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
            )`,
        ),
      )
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
