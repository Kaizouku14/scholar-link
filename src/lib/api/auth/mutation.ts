import { ROLE } from "@/constants/users/roles";
import type { UserAccount } from "@/interfaces/user";
import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import {
  user as userTable,
  student as studentTable,
  authorizedEmail as authorizedEmailTable,
} from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const checkStudentOnBoarded = async ({ id }: { id: string }) => {
  try {
    const allowedRoles = ROLE.INTERNSHIP_STUDENT;
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
      return true;

    return studentOnBoarded.onboarded;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to check student on boarded," + (error as Error).message,
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

export const createUserAccount = async ({ data }: { data: UserAccount }) => {
  await db.transaction(async (tx) => {
    const generatedID = generateUUID();

    await tx
      .insert(userTable)
      .values({
        id: generatedID,
        name: data.name,
        surname: data.surname,
        middleName: data.middleName,
        email: data.email,
        profile: data.profile,
        profileKey: data.profileKey,
        contact: data.contact,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        department: data.department,
        role: data.role,
      })
      .execute();

    if (data.role === ROLE.INTERNSHIP_STUDENT) {
      await tx
        .insert(studentTable)
        .values({
          id: generatedID,
          studentNo: data.studentNo!,
          course: data.course!,
          section: data.section!,
          yearLevel: data.yearLevel!,
          onboarded: true,
        })
        .execute();
    }
  });
};
