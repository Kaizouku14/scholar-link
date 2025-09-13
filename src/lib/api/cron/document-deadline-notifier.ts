import { db, lt, eq, sql, and } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  document as DocumentTable,
  internship as InternshipTable,
  internDocuments as InternDocumentsTable,
} from "@/server/db/schema/internship";
import { sendEmail } from "@/services/email";
import { TRPCError } from "@trpc/server";
import type { StudentNotification } from "@/interfaces/internship/notification";
import { deadlineReminderEmailTemplate } from "@/services/email-templates/deadlineReminderEmail";

export const documentDeadlineNotifier = async () => {
  try {
    const threeDaysFromNow = new Date(); //Calculate 3 days from now
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    threeDaysFromNow.setHours(23, 59, 59, 999);

    const resutls = await db.transaction(async (tx) => {
      const requiredDocuments = await tx
        .select({
          documentType: DocumentTable.documentType,
          deadline: DocumentTable.deadline,
        })
        .from(DocumentTable)
        .where(lt(DocumentTable.deadline, threeDaysFromNow))
        .execute();

      if (requiredDocuments.length < 0) return [];

      const internToNotify = await tx
        .select({
          id: UserTable.id,
          email: UserTable.email,
          name: UserTable.name,
        })
        .from(UserTable)
        .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
        .where(sql`${InternshipTable.status} IN ('pending', 'on-going')`)
        .execute();

      const notifications: StudentNotification[] = [];

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
          notifications.push({
            email: student.email,
            name: student.name,
            missingDocuments: missingDocuments.map((doc) => doc.documentType),
            deadline: new Date(threeDaysFromNow),
          });
        }
      }

      return notifications;
    });

    if (resutls.length > 0) {
      await sendNotification(resutls);
    }

    return resutls;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};

async function sendNotification(notifications: StudentNotification[]) {
  await Promise.all(
    notifications.map(async (notification) => {
      try {
        await sendEmail({
          to: notification.email,
          subject: "Deadline Reminder",
          html: deadlineReminderEmailTemplate(notification),
        });
      } catch (error) {
        console.error(`Failed to notify ${notification.email}:`, error);
      }
    }),
  );
}
