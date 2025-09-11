import { db, desc, eq, inArray, sql, and } from "@/server/db";
import {
  scholarshipProgram as ProgramTable,
  programCoodinators as ProgramCoordinatorTable,
  applications as ApplicationsTable,
  scholars_documents as ScholarsDocumentTable,
} from "@/server/db/schema/scholarship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import type { Applications } from "@/interfaces/scholarship/application";

//Coordinator Program
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
      //Program
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
      dateOfBirth: UserTable.dateOfBirth,
      sex: UserTable.gender,

      //StudentInfo
      studentNo: StudentTable.studentNo,
      department: UserTable.department,

      //Document Submitted
      documents: sql<string>`
        json_group_array(
          json_object(
            'id', ${ScholarsDocumentTable.id},
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
      eq(ScholarsDocumentTable.applicantId, ApplicationsTable.applicationsId),
    )
    .where(
      and(
        inArray(ApplicationsTable.programId, programIds),
        eq(ApplicationsTable.status, "pending"),
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
