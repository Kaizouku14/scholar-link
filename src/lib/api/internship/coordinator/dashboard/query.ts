import type { SectionType } from "@/constants/users/sections";
import { and, countDistinct, db, eq, sql } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  document as DocumentTable,
  internDocuments as InternDocumentsTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getCoordinatorDashboardStats = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db
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
      const totalRequiredDocuments = requiredDocuments.length;

      const [counts] = await tx
        .select({
          studentCount: countDistinct(InternshipTable.userId).as(
            "studentCount",
          ),
          pendingCount: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'pending')`,
          completedCount: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'completed')`,
          inProgressCount: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'on-going')`,
          documentsCompletedCount: sql<number>`
          COUNT(DISTINCT ${InternshipTable.userId}) FILTER (
            WHERE (
              SELECT COUNT(DISTINCT ${InternDocumentsTable.documentType})
              FROM ${InternDocumentsTable}
              WHERE ${InternDocumentsTable.internId} = ${InternshipTable.userId}
              AND ${InternDocumentsTable.reviewStatus} = 'approved'
            ) = ${totalRequiredDocuments}
          )
        `,
        })
        .from(InternshipTable)
        .innerJoin(UserTable, eq(InternshipTable.userId, UserTable.id))
        .leftJoin(
          InternDocumentsTable,
          eq(InternDocumentsTable.internId, UserTable.id),
        )
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
        .execute();

      return {
        counts,
        coordinatorDeparment,
      };
    })
    .catch((error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    });
};
