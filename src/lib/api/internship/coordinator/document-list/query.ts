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
import type { StudentDocuments } from "@/interfaces/internship/document";

export const getAllInternsDocumentsBySection = async ({
  id,
}: {
  id: string;
}) => {
  const response = await db
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
          type: InternDocumentsTable.documentType,
          url: InternDocumentsTable.documentUrl,
          reviewStatus: InternDocumentsTable.reviewStatus,
          submittedAt: InternDocumentsTable.submittedAt,
          studentId: UserTable.id,
          name: UserTable.name,
          email: UserTable.email,
          contactNo: UserTable.contact,
          profile: UserTable.profile,
          section: UserTable.section,
          course: StudentTable.course,
          yearLevel: StudentTable.yearLevel,
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
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get documents: " + (error as Error).message,
      });
    });

  return Object.values(
    response.reduce(
      (acc, row) => {
        if (!acc[row.studentId] && row) {
          // First time we see this student → create entry
          acc[row.studentId] = {
            ...row,
            profile: row.profile!,
            section: row.section!,
            course: row.course,
            yearLevel: row.yearLevel,
            documents: [],
          };
        }

        if (row.id) {
          acc[row.studentId]?.documents.push({
            id: row.id,
            type: row.type,
            url: row.url,
            reviewStatus: row.reviewStatus,
          });
        }

        return acc;
      },
      {} as Record<string, StudentDocuments>,
    ),
  );
};
