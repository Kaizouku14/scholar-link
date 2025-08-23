import { and, db, eq, sql } from "@/server/db";
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
import type { SectionType } from "@/constants/users/sections";

export const getAllDocumentsToReviewBySection = async ({
  id,
}: {
  id: string;
}) => {
  return await db
    .transaction(async (tx) => {
      const [coordinator] = await tx
        .select({
          section: UserTable.section,
          department: UserTable.department,
        })
        .from(UserTable)
        .where(eq(UserTable.id, id))
        .limit(1);

      const coordinatorSections: SectionType[] = coordinator?.section ?? [];
      const coordinatorDeparment = coordinator?.department;

      const documents = await tx
        .select({
          id: InternDocumentsTable.documentId,
          documentType: InternDocumentsTable.documentType,
          documentUrl: InternDocumentsTable.documentUrl,
          reviewStatus: InternDocumentsTable.reviewStatus,
          submittedAt: InternDocumentsTable.submittedAt,
          studentId: UserTable.id,
          name: UserTable.name,
          middleName: UserTable.middleName,
          surname: UserTable.surname,
          profile: UserTable.profile,
          section: UserTable.section,
          course: StudentTable.course,
          yearLevel: StudentTable.yearLevel,
          companyName: CompanyTable.name,
        })
        .from(InternDocumentsTable)
        .innerJoin(UserTable, eq(InternDocumentsTable.internId, UserTable.id))
        .innerJoin(StudentTable, eq(UserTable.id, StudentTable.id))
        .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
        .where(
          and(
            eq(UserTable.department, coordinatorDeparment!),
            sql`EXISTS (
                        SELECT 1
                        FROM json_each(${UserTable.section})
                        WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
                    )`,
          ),
        )
        .innerJoin(
          CompanyTable,
          eq(InternshipTable.companyId, CompanyTable.companyId),
        )
        .orderBy(InternDocumentsTable.submittedAt, UserTable.section);

      return documents;
    })
    .catch((error) => {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get documents: " + (error as Error).message,
      });
    });
};
