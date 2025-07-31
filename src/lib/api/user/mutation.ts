import type { courseType } from "@/constants/courses";
import { db, eq } from "@/server/db";
import {
  user as userTable,
  student as studentTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const checkStudentNoAvailability = async ({
  studentNo,
}: {
  studentNo: string;
}) => {
  try {
    const [studentNoAvailability] = await db
      .select()
      .from(studentTable)
      .where(eq(studentTable.studentNo, studentNo))
      .limit(1);

    return !!studentNoAvailability;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to check student no availability," + (error as Error).message,
    });
  }
};

export const createdStudentNo = async ({
  id,
  studentNo,
  course,
}: {
  id: string;
  studentNo: string;
  course: courseType;
}) => {
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
      studentNo,
      course,
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create student no," + (error as Error).message,
    });
  }
};
