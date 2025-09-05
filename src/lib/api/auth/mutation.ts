import { ROLE } from "@/constants/users/roles";
import type { UserAccount } from "@/interfaces/user";
import { auth } from "@/lib/auth";
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
    const allowedRoles = [
      ROLE.INTERNSHIP_STUDENT,
      ROLE.SCHOLARSHIP_STUDENT,
    ] as const;

    const [studentOnBoarded] = await db
      .select({
        onboarded: studentTable.onboarded,
        role: userTable.role,
      })
      .from(studentTable)
      .innerJoin(userTable, eq(studentTable.id, userTable.id))
      .where(eq(studentTable.id, id))
      .limit(1);

    const userRole = studentOnBoarded?.role as (typeof allowedRoles)[number];
    if (!studentOnBoarded || !allowedRoles.includes(userRole)) return true;

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
    const authEmailId = generateUUID();

    const newUser = await auth.api.createUser({
      body: {
        name: data.name,
        email: data.email,
        password: data.password!,
      },
    });

    const { user } = newUser;

    if (!newUser) {
      throw new Error("Error creating user");
    }

    await tx
      .update(userTable)
      .set({
        section: data.section,
        profile: data.profile,
        profileKey: data.profileKey,
        contact: data.contact,
        address: data.address,
        course: data.course!,
        department: data.department,
        role: data.role,
        emailVerified: true,
      })
      .where(eq(userTable.id, user.id))
      .execute();

    await tx.insert(authorizedEmailTable).values({
      id: authEmailId,
      email: data.email,
    });

    if (data.role === ROLE.INTERNSHIP_STUDENT) {
      await tx
        .insert(studentTable)
        .values({
          id: user.id,
          studentNo: data.studentNo!,
          yearLevel: "4th",
          onboarded: true,
        })
        .execute();
    }
  });
};
