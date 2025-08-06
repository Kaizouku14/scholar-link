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
import type { departmentType } from "@/constants/departments";

export const getAllDocumentByDepartment = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const response = await db
      .select({
        documentType: InternDocumentsTable.documentType,
        documentUrl: InternDocumentsTable.documentUrl,
        reviewStatus: InternDocumentsTable.reviewStatus,
        submittedAt: InternDocumentsTable.submittedAt,
        name: UserTable.name,
        profileKey: UserTable.profileKey,
        section: StudentTable.section,
        course: StudentTable.course,
        companyName: CompanyTable.name,
      })
      .from(InternDocumentsTable)
      .innerJoin(UserTable, eq(InternDocumentsTable.internId, UserTable.id))
      .innerJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .innerJoin(InternTable, eq(UserTable.id, InternTable.userId))
      .innerJoin(
        InternshipTable,
        eq(InternTable.internshipId, InternshipTable.internshipId),
      )
      .where(eq(InternshipTable.department, department))
      .innerJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      );

    return response ?? [];
  } catch (error) {
    console.error("Failed to get documents:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get documents: " + (error as Error).message,
    });
  }
};
