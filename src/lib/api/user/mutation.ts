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

export const checkStudentOnBoarded = async ({ id }: { id: string }) => {
  try {
    const allowedRoles = ["internshipStudent"];
    const [studentOnBoarded] = await db
      .select({
        onboarded: studentTable.onboarded,
        role: userTable.role,
      })
      .from(studentTable)
      .innerJoin(userTable, eq(studentTable.id, userTable.id))
      .where(eq(studentTable.id, id))
      .limit(1);

    if (!studentOnBoarded || !allowedRoles.includes(studentOnBoarded.role!))
      return false;

    return studentOnBoarded.onboarded;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to check student on boarded," + (error as Error).message,
    });
  }
};
