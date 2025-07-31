import type { courseType } from "@/constants/courses";
import type { GenderType } from "@/constants/genders";
import type { StudentProfileType } from "@/interfaces/student-profile";
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

export const insertStudentProfile = async ({
  data,
}: {
  data: StudentProfileType;
}) => {
  console.log(data);
  try {
    const [updatedUser] = await db
      .update(userTable)
      .set({
        profile: data.profile,
        profileKey: data.profileKey,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        contact: data.contact,
        address: data.address,
      })
      .where(eq(userTable.id, data.id))
      .returning();

    if (!updatedUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      });
    }

    const [updatedStudent] = await db
      .update(studentTable)
      .set({
        course: data.course,
        section: data.section,
        yearLevel: data.yearLevel,
        onboarded: true,
      })
      .where(eq(studentTable.id, data.id))
      .returning();

    if (!updatedStudent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Student not found.",
      });
    }
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update student profile." + (error as Error).message,
    });
  }
};
