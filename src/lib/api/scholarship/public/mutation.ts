import { ROLE } from "@/constants/users/roles";
import type { NewApplication } from "@/interfaces/scholarship/application";
import { generateUUID } from "@/lib/utils";
import { db, eq, and, or, ne, inArray } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  applications as ApplicationTable,
  scholarsDocuments as ScholarsDocumentTable,
  programCoodinators as ProgramCoordinatorTable,
} from "@/server/db/schema/scholarship";
import { createNotification } from "../../user/mutation";
import { TRPCError } from "@trpc/server";
import { deleteFilesIfExist } from "@/server/api/uploadthing";

export const isUserAllowed = async ({ email }: { email: string }) => {
  try {
    const [existing] = await db
      .select({ id: ApplicationTable.applicationsId })
      .from(ApplicationTable)
      .leftJoin(UserTable, eq(UserTable.id, ApplicationTable.userId))
      .where(
        and(
          eq(UserTable.email, email),
          or(
            eq(ApplicationTable.status, "qualified"),
            eq(ApplicationTable.status, "active"),
            eq(ApplicationTable.status, "renewal"),
          ),
        ),
      )
      .limit(1)
      .execute();

    // true = user already has an active/qualified/renewal scholarship
    return !!existing;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to check existing scholarship: " + (error as Error).message,
    });
  }
};

export const createApplication = async ({
  application,
}: {
  application: NewApplication;
}) => {
  const fileKeys = Object.values(application.requirements).map((r) => r.key);

  try {
    await db.transaction(async (tx) => {
      let userId: string;

      // get userId if exist
      const [existingUser] = await tx
        .select({ id: UserTable.id })
        .from(UserTable)
        .where(eq(UserTable.email, application.email))
        .limit(1);

      if (existingUser?.id) {
        userId = existingUser.id;
      } else {
        userId = generateUUID();
        await tx.insert(UserTable).values({
          id: userId,
          name: application.name,
          email: application.email,
          gender: application.sex,
          dateOfBirth: application.dateOfBirth,
          contact: application.contact,
          address: application.address,
          course: application.course,
          role: ROLE.SCHOLARSHIP_STUDENT,
        });
      }

      // Deactivate any existing "for-renewal" applications for other programs
      const existingForRenewals = await tx
        .select({ id: ApplicationTable.applicationsId })
        .from(ApplicationTable)
        .where(
          and(
            eq(ApplicationTable.userId, userId),
            eq(ApplicationTable.status, "for-renewal"),
            ne(ApplicationTable.programId, application.programId),
          ),
        )
        .execute();

      if (existingForRenewals.length > 0) {
        await tx
          .update(ApplicationTable)
          .set({ status: "inactive" })
          .where(
            inArray(
              ApplicationTable.applicationsId,
              existingForRenewals.map((a) => a.id),
            ),
          );
      }

      // Create new application
      const applicationsId = generateUUID();
      await tx.insert(ApplicationTable).values({
        applicationsId,
        userId,
        programId: application.programId,
        appliedAt: new Date(),
      });

      // Insert documents
      await tx.insert(ScholarsDocumentTable).values(
        Object.values(application.requirements).map((value) => ({
          id: generateUUID(),
          applicationsId,
          documentName: value.label,
          documentUrl: value.url,
          documentKey: value.key,
          submittedAt: new Date(),
        })),
      );

      const [coordinator] = await tx
        .select({ id: ProgramCoordinatorTable.userId })
        .from(ProgramCoordinatorTable)
        .where(eq(ProgramCoordinatorTable.programId, application.programId))
        .limit(1)
        .execute();

      if (coordinator?.id) {
        void createNotification(
          coordinator.id,
          "applications",
          "New Application",
        );
      }
    });
  } catch (error) {
    if (fileKeys.length > 0) {
      await deleteFilesIfExist(fileKeys);
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to create scholarship application: " + (error as Error).message,
    });
  }
};
