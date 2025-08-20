import type { departmentType } from "@/constants/users/departments";
import { type roleType, ROLE } from "@/constants/users/roles";
import { db, eq } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { internDocuments as InternDocumentsTable } from "@/server/db/schema/internship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";

export const getAllInternsDocuments = async ({
  role,
  department,
}: {
  role: roleType;
  department: departmentType;
}) => {
  try {
    const baseQuery = db
      .select({
        documentId: InternDocumentsTable.documentId,
        documentType: InternDocumentsTable.documentType,
        documentUrl: InternDocumentsTable.documentUrl,
        documentStatus: InternDocumentsTable.reviewStatus,
        studentId: UserTable.id,
        name: UserTable.name,
        email: UserTable.email,
        contactNo: UserTable.contact,
        surname: UserTable.surname,
        profile: UserTable.profile,
        studentNo: StudentTable.studentNo,
        section: StudentTable.section,
        course: StudentTable.course,
        yearLevel: StudentTable.yearLevel,
      })
      .from(InternDocumentsTable)
      .leftJoin(UserTable, eq(InternDocumentsTable.internId, UserTable.id))
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id));

    let query;
    if (role === ROLE.INTERNSHIP_COORDINATOR) {
      query = baseQuery.where(eq(UserTable.department, department));
    } else {
      query = baseQuery;
    }

    const response = await query.execute();
    console.log(response);

    return [];

    // return Object.values(
    //   response.reduce(
    //     (acc, row) => {
    //       if (!acc[row.studentId!]) {
    //         acc[row.studentId!] = {
    //           studentId: row.studentId,
    //           studentNo: row.studentNo,
    //           name: row.name,
    //           email: row.email,
    //           contactNo: row.contactNo,
    //           surname: row.surname,
    //           profile: row.profile,
    //           section: row.section,
    //           course: row.course,
    //           yearLevel: row.yearLevel,
    //           documents: [],
    //         };
    //       }

    //       acc[row.studentId!].documents.push({
    //         id: row.documentId,
    //         type: row.documentType,
    //         url: row.documentUrl,
    //         status: row.documentStatus,
    //       });

    //       return acc;
    //     },
    //     {} as Record<string, any>,
    //   ),
    // );
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get documents," + (error as Error).message,
    });
  }
};
