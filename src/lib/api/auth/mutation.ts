import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import { authorizedEmail as authorizedEmailTable } from "@/server/db/schema/auth";

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
