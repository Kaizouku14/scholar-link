import { and, db, eq, sql } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internDocuments as InternDocumentsTable,
  internship as InternshipTable,
  company as CompanyTable,
  document as DocumentTable,
} from "@/server/db/schema/internship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import type { SectionType } from "@/constants/users/sections";
import type { StudentDocuments } from "@/interfaces/internship/document";

export const getAllInternsDocumentsBySection = async ({
  userId,
}: {
  userId: string;
}) => {
  const response = await db
    .transaction(async (tx) => {
      const [coordinator] = await tx
        .select({
          section: UserTable.section,
          department: UserTable.department,
        })
        .from(UserTable)
        .where(eq(UserTable.id, userId))
        .limit(1);

      const coordinatorSections: SectionType[] = coordinator?.section ?? [];
      const coordinatorDeparment = coordinator?.department;

      const requiredDocuments = await tx
        .select({ documentType: DocumentTable.documentType })
        .from(DocumentTable);

      const documents = await tx
        .select({
          id: InternDocumentsTable.documentId,
          type: InternDocumentsTable.documentType,
          url: InternDocumentsTable.documentUrl,
          reviewStatus: InternDocumentsTable.reviewStatus,
          studentId: UserTable.id,
          name: UserTable.name,
          email: UserTable.email,
          contactNo: UserTable.contact,
          profile: UserTable.profile,
          section: UserTable.section,
          course: StudentTable.course,
        })
        .from(UserTable)
        .leftJoin(
          InternDocumentsTable,
          eq(InternDocumentsTable.internId, UserTable.id),
        )
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
        .orderBy(UserTable.section);

      return { documents, requiredDocuments };
    })
    .catch((error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get documents: " + (error as Error).message,
      });
    });

  const { documents, requiredDocuments } = response;

  return Object.values(
    documents.reduce(
      (acc, row) => {
        const studentId = row.studentId;

        acc[studentId] ??= {
          ...row,
          profile: row.profile!,
          section: row.section!,
          course: row.course!,
          yearLevel: row.yearLevel!,
          documents: [],
          requiredDocuments,
        };

        if (row.id) {
          acc[studentId].documents.push({
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
