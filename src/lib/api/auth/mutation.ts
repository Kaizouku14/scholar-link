import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import {
  authorizedEmail as authorizedEmailTable,
  student as studentTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const createdStudentNo = async ({
  id,
  studentNo,
}: {
  id: string;
  studentNo: string;
}) => {
  try {
    const existing = await db.query.student.findFirst({
      where: eq(studentTable.studentNo, studentNo),
    });

    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Student number already exists.",
      });
    }

    await db.insert(studentTable).values({
      id,
      studentNo,
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create student no," + (error as Error).message,
    });
  }
};

export const isEmailAuthorized = async ({ email }: { email: string }) => {
  const [authorizedEmail] = await db
    .select()
    .from(authorizedEmailTable)
    .where(eq(authorizedEmailTable.email, email))
    .limit(1)
    .execute();

  return !!authorizedEmail;
};

export const revokeAuthorizedEmail = async ({ email }: { email: string }) => {
  return await db
    .delete(authorizedEmailTable)
    .where(eq(authorizedEmailTable.email, email))
    .execute();
};

export const authorizeEmail = async ({ email }: { email: string }) => {
  const generatedID = generateUUID();

  return await db
    .insert(authorizedEmailTable)
    .values({
      id: generatedID,
      email,
    })
    .execute();
};
