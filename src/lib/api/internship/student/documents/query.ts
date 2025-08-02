import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { document as DocumentsTable } from "@/server/db/schema/internship";

export const getAllDocumentsAvailable = async () => {
  try {
    const response = await db.select().from(DocumentsTable).execute();
    return response;
  } catch (error) {
    console.error("Get error:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get documents," + (error as Error).message,
    });
  }
};
