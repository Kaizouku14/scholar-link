import { db, desc, eq, inArray, sql, and, ne } from "@/server/db";
import {
  scholarshipProgram as ProgramTable,
  programCoodinators as ProgramCoordinatorTable,
  applications as ApplicationsTable,
  scholarsDocuments as ScholarsDocumentTable,
} from "@/server/db/schema/scholarship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import type { Applications } from "@/interfaces/scholarship/application";

export const getCoordProgramApplications = async ({
  userId,
}: {
  userId: string;
}) => {
  const program = await db
    .select({
      programId: ProgramCoordinatorTable.programId,
    })
    .from(ProgramCoordinatorTable)
    .where(eq(ProgramCoordinatorTable.userId, userId))
    .execute();

  const programIds = program.map((program) => program.programId);
  const applicants = await db
    .selectDistinct({
      programName: ProgramTable.name,
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
            'reviewStatus', ${ScholarsDocumentTable.reviewStatus},
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
        ne(ApplicationsTable.status, "unactive"),
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
};
