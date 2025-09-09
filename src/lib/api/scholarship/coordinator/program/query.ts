import { db, eq, inArray } from "@/server/db";
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

  console.log(programIds);

  const applicants = await db
    .selectDistinct()
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
    .where(inArray(ApplicationsTable.programId, programIds))
    .groupBy(ApplicationsTable.applicationsId)
    .execute();

  return applicants;
};
