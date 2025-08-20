import { db, eq } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internDocuments as InternDocumentsTable,
  internship as InternshipTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import type { departmentType } from "@/constants/users/departments";

export const getAllDocumentByDepartment = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const response = await db
      .select({
        id: InternDocumentsTable.documentId,
        documentType: InternDocumentsTable.documentType,
        documentUrl: InternDocumentsTable.documentUrl,
        reviewStatus: InternDocumentsTable.reviewStatus,
        submittedAt: InternDocumentsTable.submittedAt,
        name: UserTable.name,
        surname: UserTable.surname,
        profile: UserTable.profile,
        section: StudentTable.section,
        course: StudentTable.course,
        yearLevel: StudentTable.yearLevel,
        companyName: CompanyTable.name,
      })
      .from(InternDocumentsTable)
      .innerJoin(UserTable, eq(InternDocumentsTable.internId, UserTable.id))
      .innerJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
      .where(eq(UserTable.department, department))
      .innerJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .orderBy(InternDocumentsTable.submittedAt, StudentTable.section);
    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get documents: " + (error as Error).message,
    });
  }
};
