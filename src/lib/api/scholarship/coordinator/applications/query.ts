import { db, desc, eq, inArray, sql, and, ne } from "@/server/db";
import {
  scholarshipProgram as ProgramTable,
  applications as ApplicationsTable,
  scholarsDocuments as ScholarsDocumentTable,
} from "@/server/db/schema/scholarship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import type { Applications } from "@/interfaces/scholarship/application";
import { TRPCError } from "@trpc/server";
import { getCoordinatorPrograms } from "../query";

export const getCoordProgramApplications = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const programIds = await getCoordinatorPrograms({ userId });
    const applicants = await db
      .selectDistinct({
        programName: ProgramTable.name,
        eligibilityType: ProgramTable.eligibilityType,
        //Application
        applicationId: ApplicationsTable.applicationsId,
        appliedAt: ApplicationsTable.appliedAt,
        status: ApplicationsTable.status,

        //User
        name: UserTable.name,
        profile: UserTable.profile,
        yearLevel: StudentTable.yearLevel,
        course: UserTable.course,
        section: UserTable.section,

        email: UserTable.email,
        contact: UserTable.contact,
        address: UserTable.address,

        //Document Submitted
        documents: sql<string>`
            json_group_array(
              json_object(
                'id', ${ScholarsDocumentTable.id},
                'label', ${ScholarsDocumentTable.documentName},
                'url', ${ScholarsDocumentTable.documentUrl},
                'reviewed', ${ScholarsDocumentTable.reviewed},
                'submittedAt', ${ScholarsDocumentTable.submittedAt}
              )
            )
          `.as("documents"),
      })
      .from(ApplicationsTable)
      .leftJoin(UserTable, eq(UserTable.id, ApplicationsTable.userId))
      .leftJoin(StudentTable, eq(StudentTable.id, ApplicationsTable.userId))
      .leftJoin(
        ProgramTable,
        eq(ProgramTable.programId, ApplicationsTable.programId),
      )
      .leftJoin(
        ScholarsDocumentTable,
        eq(
          ScholarsDocumentTable.applicationsId,
          ApplicationsTable.applicationsId,
        ),
      )
      .where(
        and(
          inArray(ApplicationsTable.programId, programIds),
          ne(ApplicationsTable.status, "active"),
          ne(ApplicationsTable.status, "inactive"),
          ne(ApplicationsTable.status, "for-renewal"),
        ),
      )
      .orderBy(desc(ApplicationsTable.appliedAt))
      .groupBy(ApplicationsTable.applicationsId)
      .execute();

    return applicants.map((app) => ({
      ...app,
      documents: app.documents
        ? (JSON.parse(app.documents) as ScholarDocument)
        : [],
    })) as Applications[];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch applications," + (error as Error).message,
    });
  }
};
