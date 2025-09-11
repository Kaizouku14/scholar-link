import { db, eq, and, sql } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
  notifications as NotificationTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";
import { NOTIFICATIONS } from "@/constants/notification";

export const getStudentInfo = async (userId: string) => {
  try {
    const [response] = await db
      .select({
        profile: UserTable.profile,
        gender: UserTable.gender,
        dateOfBirth: UserTable.dateOfBirth,
        contactNo: UserTable.contact,
        address: UserTable.address,
        course: UserTable.course,
        studentNo: StudentTable.studentNo,
        yearLevel: StudentTable.yearLevel,
      })
      .from(UserTable)
      .leftJoin(StudentTable, eq(StudentTable.id, UserTable.id))
      .where(eq(UserTable.id, userId))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get student info" + (error as Error).message,
    });
  }
};

export const getNotification = async ({ userId }: { userId: string }) => {
  const rows = await db
    .select({
      type: NotificationTable.type,
      count: sql<number>`count(*)`,
    })
    .from(NotificationTable)
    .where(
      and(
        eq(NotificationTable.userId, userId),
        eq(NotificationTable.isRead, false),
      ),
    )
    .groupBy(NotificationTable.type)
    .execute();

  return NOTIFICATIONS.reduce(
    (acc, type) => {
      acc[type] = rows.find((r) => r.type === type)?.count ?? 0;
      return acc;
    },
    {} as Record<(typeof NOTIFICATIONS)[number], number>,
  );
};
