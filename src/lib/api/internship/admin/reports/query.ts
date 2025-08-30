import { ROLE } from "@/constants/users/roles";
import { db, eq } from "@/server/db";
import {
  student as StudenTable,
  user as UserTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getInternshipReports = async () => {
  try {
    const interns = await db
      .select({
        profile: UserTable.profile,
        studentName: UserTable.name,
        studentEmail: UserTable.email,
        contactNo: UserTable.contact,
        sex: UserTable.gender,
        section: UserTable.section,
        department: UserTable.department,

        course: UserTable.course,
        studentNo: StudenTable.studentNo,

        duration: InternshipTable.duration,

        company: CompanyTable.name,
        companyAddress: CompanyTable.address,

        supervisorName: SupervisorTable.name,
        supervisorEmail: SupervisorTable.email,
        supervisorContactNo: SupervisorTable.contactNo,
      })
      .from(UserTable)
      .leftJoin(StudenTable, eq(UserTable.id, StudenTable.id))
      .leftJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
      .leftJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .leftJoin(
        SupervisorTable,
        eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
      )
      .where(eq(InternshipTable.status, "pending"))
      .execute();

    const coordinators = await db
      .select({
        coordinatorName: UserTable.name,
        section: UserTable.section,
        course: UserTable.course,
        department: UserTable.department,
      })
      .from(UserTable)
      .where(eq(UserTable.role, ROLE.INTERNSHIP_COORDINATOR))
      .execute();

    //TODO: Check if need separated by course too
    const report = interns.map((intern) => {
      const coordinator = coordinators.find(
        (c) =>
          c.department === intern.department &&
          c.course === intern.course &&
          c.section?.some((s) => intern.section?.includes(s)), // section overlap
      );

      return {
        ...intern,
        coordinatorName: coordinator?.coordinatorName ?? "N/A",
        coordinatorSections: coordinator?.section ?? [],
        coordinatorDepartment: coordinator?.department ?? "N/A",
      };
    });

    return report;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
