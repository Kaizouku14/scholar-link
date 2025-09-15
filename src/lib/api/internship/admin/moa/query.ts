import type { MOA } from "@/interfaces/internship/moa";
import { db, eq, or, and } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import { internDocuments as InternsDocumentsTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getInternsMoa = async () => {
  try {
    const response = await db
      .select({
        profile: UserTable.profile,
        name: UserTable.name,
        email: UserTable.email,
        contactNo: UserTable.contact,
        course: UserTable.course,
        section: UserTable.section,
        deparment: UserTable.department,
        documentUrl: InternsDocumentsTable.documentUrl,
      })
      .from(UserTable)
      .leftJoin(
        InternsDocumentsTable,
        eq(UserTable.id, InternsDocumentsTable.internId),
      )
      .where(
        and(
          eq(InternsDocumentsTable.reviewStatus, "approved"),
          or(
            eq(InternsDocumentsTable.documentType, "moa"),
            eq(InternsDocumentsTable.documentType, "memorandum-of-agreement"),
          ),
        ),
      );

    return response as MOA[];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get interns moa," + (error as Error).message,
    });
  }
};
