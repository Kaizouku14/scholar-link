import { db, eq } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

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
