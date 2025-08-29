import type { SectionType } from "@/constants/users/sections";
import type { DocumentReminder } from "@/interfaces/internship/alert-card";
import { formatText } from "@/lib/utils";
import { and, countDistinct, db, eq, sql, lt } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  document as DocumentTable,
  internDocuments as InternDocumentsTable,
  supervisor as SupervisorTable,
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

export const getReminderForDocuments = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const result = await db.transaction(async (tx) => {
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
        .select({
          documentType: DocumentTable.documentType,
          deadline: DocumentTable.deadline,
        })
        .from(DocumentTable)
        .where(lt(DocumentTable.deadline, new Date()))
        .execute();

      if (requiredDocuments.length < 0) return [];

      const internToNotify = await tx
        .select({
          id: UserTable.id,
          name: UserTable.name,
          course: StudentTable.course,
          section: UserTable.section,
          supervisorContact: SupervisorTable.contactNo,
        })
        .from(UserTable)
        .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
        .innerJoin(StudentTable, eq(UserTable.id, StudentTable.id))
        .innerJoin(
          SupervisorTable,
          eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
        )
        .where(
          and(
            eq(UserTable.department, coordinatorDeparment!),
            sql`EXISTS (
                SELECT 1
                FROM json_each(${UserTable.section})
                WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
            )`,
            sql`${InternshipTable.status} IN ('pending', 'on-going')`,
          ),
        )
        .execute();

      const reminder: DocumentReminder[] = [];

      for (const student of internToNotify) {
        const submittedDocuments = await tx
          .select({ documentType: InternDocumentsTable.documentType })
          .from(InternDocumentsTable)
          .where(
            and(
              eq(InternDocumentsTable.internId, student.id),
              eq(InternDocumentsTable.reviewStatus, "approved"),
            ),
          );

        const submittedTypes = submittedDocuments.map(
          (doc) => doc.documentType,
        );

        // Find missing documents with upcoming deadlines
        const missingDocuments = requiredDocuments.filter(
          (doc) => !submittedTypes.includes(doc.documentType),
        );

        if (missingDocuments.length > 0) {
          reminder.push({
            id: student.id,
            name: student.name,
            section: student.section,
            course: student.course,
            missingDocument: missingDocuments.map((doc) =>
              formatText(doc.documentType),
            ),
            supervisorContactNo: student.supervisorContact,
          });
        }
      }

      return reminder;
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
