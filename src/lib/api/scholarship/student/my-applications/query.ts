import type { Requirement } from "@/interfaces/scholarship/requirements";
import type { ScholarApplications } from "@/interfaces/scholarship/scholars";
import { db, eq, sql } from "@/server/db";
import {
  applications as ApplicationsTable,
  scholarshipProgram as ProgramTable,
  scholarsDocuments as ScholarsDocumentsTable,
  requirements as RequirementsTable,
} from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";

export const getAllApplications = async ({ userId }: { userId: string }) => {
  try {
    const response = await db
      .select({
        programName: ProgramTable.name,
        image: ProgramTable.imageUrl,
        description: ProgramTable.description,
        deadline: ProgramTable.deadline,
        announcement: ProgramTable.announcements,
        applicationId: ApplicationsTable.applicationsId,
        appliedAt: ApplicationsTable.appliedAt,
        updatedAt: ApplicationsTable.updatedAt,
        status: ApplicationsTable.status,
        requirements: sql<string>`
            json_group_array(
                json_object(
                'requirementId', ${RequirementsTable.requirementId},
                'label', ${RequirementsTable.label},
                'description', ${RequirementsTable.description},
                'isRequired', ${RequirementsTable.isRequired}
                )
            )
            `.as("requirements"),
      })
      .from(ApplicationsTable)
      .innerJoin(
        ProgramTable,
        eq(ProgramTable.programId, ApplicationsTable.programId),
      )
      .innerJoin(
        RequirementsTable,
        eq(RequirementsTable.programId, ApplicationsTable.programId),
      )
      .innerJoin(
        ScholarsDocumentsTable,
        eq(
          ScholarsDocumentsTable.applicationsId,
          ApplicationsTable.applicationsId,
        ),
      )
      .where(eq(ApplicationsTable.userId, userId))
      .execute();

    return response.map((app) => ({
      ...app,
      requirements: app.requirements
        ? (JSON.parse(app.requirements) as Requirement)
        : [],
    })) as ScholarApplications[];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all applications, " + (error as Error).message,
    });
  }
};
