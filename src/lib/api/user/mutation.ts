import type { notificationType } from "@/constants/notification";
import type { StudentProfileType } from "@/interfaces/student-profile";
import { ee, Events } from "@/lib/event";
import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import {
  user as userTable,
  student as studentTable,
  notifications as NotificationTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

// export const checkStudentNoAvailability = async ({
//   studentNo,
// }: {
//   studentNo: string;
// }) => {
//   try {
//     const [studentNoAvailability] = await db
//       .select()
//       .from(studentTable)
//       .where(eq(studentTable.studentNo, studentNo))
//       .limit(1);

//     return !!studentNoAvailability;
//   } catch {
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: "Failed to check student no availability,",
//     });
//   }
// };

export const insertStudentInfo = async ({ id }: { id: string }) => {
  try {
    const [createdUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .limit(1);

    if (!createdUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      });
    }

    await db.insert(studentTable).values({
      id: createdUser.id,
    });
  } catch {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create student no",
    });
  }
};

export const insertStudentProfile = async ({
  userId,
  data,
}: {
  data: StudentProfileType;
  userId: string;
}) => {
  try {
    return await db.transaction(async (tx) => {
      const [updatedUser] = await tx
        .update(userTable)
        .set({
          profile: data.profile,
          profileKey: data.profileKey,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          contact: data.contact,
          address: data.address,
          course: data.course,
        })
        .where(eq(userTable.id, userId))
        .returning();

      if (!updatedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      const [updatedStudent] = await tx
        .update(studentTable)
        .set({
          studentNo: data.studentNo,
          yearLevel: data.yearLevel,
          onboarded: true,
        })
        .where(eq(studentTable.id, userId))
        .returning();

      if (!updatedStudent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Student not found.",
        });
      }
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update student profile.",
    });
  }
};

export const createNotification = async (
  userId: string,
  type: notificationType,
  message: string,
) => {
  await db
    .insert(NotificationTable)
    .values({ id: generateUUID(), userId, type, message });

  ee.emit(Events.NEW_NOTIFICATION, userId);
};
