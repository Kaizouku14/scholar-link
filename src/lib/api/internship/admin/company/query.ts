import { countDistinct, db, eq } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  company as CompanyTable,
  internship as InternshipTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";

export const getAllCompany = async () => {
  try {
    const response = await db
      .select({
        companyId: CompanyTable.companyId,
        companyName: CompanyTable.name,
        address: CompanyTable.address,
        contactPerson: SupervisorTable.name,
        contactPersonEmail: SupervisorTable.email,
        contactPersonNo: SupervisorTable.contactNo,
        internCount: countDistinct(InternshipTable.userId),
      })
      .from(CompanyTable)
      .leftJoin(
        InternshipTable,
        eq(CompanyTable.companyId, InternshipTable.companyId),
      )
      //   .where(eq(InternshipTable.status, "on-going"))
      .groupBy(CompanyTable.companyId)
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all company," + (error as Error).message,
    });
  }
};

// Grouped By Company

//    let coordinatorSections: SectionType[] = [];
//       let coordinatorDeparment: departmentType | null = null;

//       // If coordinator → get their sections first
//       if (role === ROLE.INTERNSHIP_COORDINATOR) {
//         const [coordinator] = await tx
//           .select({
//             section: UserTable.section,
//             department: UserTable.department,
//           })
//           .from(UserTable)
//           .where(eq(UserTable.id, userId))
//           .limit(1);

//         coordinatorSections = coordinator?.section ?? [];
//         coordinatorDeparment = coordinator!.department;
//       }

//       const baseQuery = tx
//         .select({
//           companyId: CompanyTable.companyId,
//           companyName: max(CompanyTable.name),
//           address: max(CompanyTable.address),
//           supervisor: max(SupervisorTable.name),
//           supervisorEmail: max(SupervisorTable.email),
//           //   supervisorNo: max(SupervisorTable.contactNo),
//           studentCount: countDistinct(InternshipTable.userId),
//           totalProgressHours: sum(ProgressTable.hours),
//           department: UserTable.department,
//           interns: sql<string>`
//             json_group_array(
//               DISTINCT json_object(
//                 'name', ${UserTable.name},
//                 'middleName', ${UserTable.middleName},
//                 'surname', ${UserTable.surname},
//                 'profile', ${UserTable.profile},
//                 'email', ${UserTable.email},
//                 'section', ${UserTable.section},
//                 'status', ${InternshipTable.status}
//               )
//             )
//           `.as("interns"),
//         })
//         .from(CompanyTable)
//         .innerJoin(
//           InternshipTable,
//           eq(InternshipTable.companyId, CompanyTable.companyId),
//         )
//         .leftJoin(
//           SupervisorTable,
//           eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
//         )
//         .leftJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
//         .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
//         .leftJoin(
//           ProgressTable,
//           eq(ProgressTable.internshipId, InternshipTable.internshipId),
//         )
//         .groupBy(CompanyTable.companyId);

//       // If coordinator has sections
//       let query;
//       if (
//         role === ROLE.INTERNSHIP_COORDINATOR &&
//         coordinatorSections.length > 0
//       ) {
//         query = baseQuery.where(
//           and(
//             isNotNull(InternshipTable.userId),
//             sql`EXISTS (
//                         SELECT 1
//                         FROM json_each(${UserTable.section})
//                         WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
//                     )`,
//             eq(UserTable.department, coordinatorDeparment!),
//           ),
//         );
//       } else {
//         query = baseQuery;
//       }

//       const response = await query.execute();
//       return response.map((row) => ({
//         ...row,
//         interns: row.interns ? (JSON.parse(row.interns) as Interns[]) : [],
//       }));

// Schema for this Query

//  companyName: z.string().nullish(),
//   address: z.string().nullish(),
//   supervisor: z.string().nullish(),
//   supervisorEmail: z.string().nullish(),
//   studentCount: z.number(),
//   totalProgressHours: z.string().nullish(),
//   status: z.string().nullish(),
//   department: z.string().nullish(),
//   interns: z.array(
//     z.object({
//       name: z.string(),
//       middleName: z.string(),
//       surname: z.string(),
//       profile: z.string(),
//       email: z.string(),
//       status: z.enum(INTERNSHIP_STATUS),
//       section: z.enum(SECTIONS),
//     }),
//   ),
