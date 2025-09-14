import { TRPCError } from "@trpc/server";
import { getCoordinatorPrograms } from "../query";
import { db, eq, inArray, and, or, sql, desc } from "@/server/db";
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
import type { ProgramScholars } from "@/interfaces/scholarship/scholars";

export const getScholarsByProgram = async ({ userId }: { userId: string }) => {
  try {
    const programIds = await getCoordinatorPrograms({ userId });
    const scholars = await db
      .selectDistinct({
        programName: ProgramTable.name,
        //Application
        applicationId: ApplicationsTable.applicationsId,
        appliedAt: ApplicationsTable.appliedAt,
        updatedAt: ApplicationsTable.updatedAt,
        status: ApplicationsTable.status,
        //User
        studentNo: StudentTable.studentNo,
        name: UserTable.name,
        profile: UserTable.profile,
        yearLevel: StudentTable.yearLevel,
        course: UserTable.course,
        section: UserTable.section,
        email: UserTable.email,
        contact: UserTable.contact,
        address: UserTable.address,
        documents: sql<string>`
        json_group_array(
            json_object(
            'id', ${ScholarsDocumentTable.id},
            'label', ${ScholarsDocumentTable.documentName},
            'url', ${ScholarsDocumentTable.documentUrl}
            )
        )
        `.as("documents"),
      })
      .from(ApplicationsTable)
      .innerJoin(
        ProgramTable,
        eq(ProgramTable.programId, ApplicationsTable.programId),
      )
      .leftJoin(UserTable, eq(UserTable.id, ApplicationsTable.userId))
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .leftJoin(
        ScholarsDocumentTable,
        eq(
          ApplicationsTable.applicationsId,
          ScholarsDocumentTable.applicationsId,
        ),
      )
      .where(
        and(
          inArray(ProgramTable.programId, programIds),
          or(
            eq(ApplicationsTable.status, "active"),
            eq(ApplicationsTable.status, "inactive"),
            eq(ApplicationsTable.status, "for-renewal"),
          ),
        ),
      )
      .orderBy(desc(ApplicationsTable.appliedAt))
      .groupBy(ApplicationsTable.applicationsId)
      .execute();

    return scholars.map((app) => ({
      ...app,
      documents: app.documents
        ? (JSON.parse(app.documents) as ScholarDocument)
        : [],
    })) as ProgramScholars[];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get scholars," + (error as Error).message,
    });
  }
};
