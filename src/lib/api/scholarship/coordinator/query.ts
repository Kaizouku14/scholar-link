import { TRPCError } from "@trpc/server";
import { programCoodinators as ProgramCoordinatorTable } from "@/server/db/schema/scholarship";
import { db, eq } from "@/server/db";

export const getCoordinatorPrograms = async ({
  userId,
}: {
  userId: string;
}): Promise<string[]> => {
  try {
    const program = await db
      .select({
        programId: ProgramCoordinatorTable.programId,
      })
      .from(ProgramCoordinatorTable)
      .where(eq(ProgramCoordinatorTable.userId, userId))
      .execute();

    return program.map((program) => program.programId);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch," + (error as Error).message,
    });
  }
};
