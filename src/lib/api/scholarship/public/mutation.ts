import { ROLE } from "@/constants/users/roles";
import type { NewApplication } from "@/interfaces/scholarship/application";
import { generateUUID } from "@/lib/utils";
import { db, eq, and, or } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  applications as ApplicationTable,
  scholarsDocuments as ScholarsDocumentTable,
  programCoodinators as ProgramCoordinatorTable,
} from "@/server/db/schema/scholarship";
import { createNotification } from "../../user/mutation";
import { TRPCError } from "@trpc/server";
import { deleteFilesIfExist } from "@/server/api/uploadthing";

export const createApplication = async ({
  application,
}: {
  application: NewApplication;
}) => {
  const fileKeys = Object.values(application.requirements).map((r) => r.key);
  try {
    const [coordinator] = await db.transaction(async (tx) => {
      let userId: string;

      const existingUser = await tx
        .select({
          id: UserTable.id,
          activeAppId: ApplicationTable.applicationsId,
        })
        .from(UserTable)
        .where(eq(UserTable.email, application.email))
        .leftJoin(
          ApplicationTable,
          and(
            eq(ApplicationTable.userId, UserTable.id),
            or(
              eq(ApplicationTable.status, "qualified"),
              eq(ApplicationTable.status, "active"),
            ),
          ),
        )
        .limit(1);

      if (existingUser.length > 0 && existingUser[0]?.id) {
        userId = existingUser[0].id;

        if (existingUser[0].activeAppId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You already have an active scholarship.",
          });
        }
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

      const applicationsId = generateUUID();

      await tx.insert(ApplicationTable).values({
        applicationsId,
        userId,
        programId: application.programId,
        appliedAt: new Date(),
      });

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

      return await tx
        .select({ id: ProgramCoordinatorTable.userId })
        .from(ProgramCoordinatorTable)
        .where(eq(ProgramCoordinatorTable.programId, application.programId))
        .limit(1)
        .execute();
    });

    void createNotification(coordinator!.id, "applications", "New Application");
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
