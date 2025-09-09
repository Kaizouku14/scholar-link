import { ROLE } from "@/constants/users/roles";
import type { Application } from "@/interfaces/scholarship/create-program";
import { generateUUID } from "@/lib/utils";
import { db } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  applications as ApplicationTable,
  scholars_documents as ScholarsDocumentTable,
} from "@/server/db/schema/scholarship";

export const createApplication = async ({
  application,
}: {
  application: Application;
}) => {
  await db.transaction(async (tx) => {
    const userId = generateUUID();
    const applicationsId = generateUUID();

    await tx.insert(UserTable).values({
      id: userId,
      name: application.name,
      email: application.email,
      gender: application.sex,
      dateOfBirth: application.dateOfBirth,
      contact: application.contact,
      address: application.address,
      course: application.course,
      department: application.department,
      section: [application.section],
      role: ROLE.SCHOLARSHIP_STUDENT,
    });

    await tx.insert(StudentTable).values({
      id: userId,
      studentNo: application.studentNo,
      yearLevel: application.yearLevel,
    });

    await tx.insert(ApplicationTable).values({
      applicationsId,
      userId,
      programId: application.programId,
      appliedAt: new Date(),
    });

    for (const value of Object.values(application.requirements)) {
      await tx.insert(ScholarsDocumentTable).values({
        id: generateUUID(),
        applicantId: applicationsId,
        documentUrl: value.url,
        documentKey: value.key,
        submittedAt: new Date(),
      });
    }
  });
};
