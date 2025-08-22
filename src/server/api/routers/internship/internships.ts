import {
  DEPARTMENTS,
  type departmentType,
} from "@/constants/users/departments";
import type { roleType } from "@/constants/users/roles";
import type { createInternship } from "@/interfaces/internship/internship";
import { getAllInternsDocuments } from "@/lib/api/internship/coordinator/document-list/query";
import { createStudentInternship } from "@/lib/api/internship/mutation";
import { getAllInternships } from "@/lib/api/internship/query";
import {
  getAllDocumentsAvailable,
  getAllUpcomingDeadlines,
} from "@/lib/api/internship/student/documents/query";
import { cacheData } from "@/lib/redis";
import z from "zod";
import { createTRPCRouter, protectedRoute } from "../../trpc";

export const internshipRouter = createTRPCRouter({
  /******************************************
   *         Global API Mutation/Query       *
   ******************************************/
  getAllDocuments: protectedRoute.query(async () => {
    return await getAllDocumentsAvailable();
  }),
  getAllUpcomingDeadlines: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await getAllUpcomingDeadlines({ userId });
  }),
  /******************************************
   *   Admin/Coordinator API Mutation/Query *
   ******************************************/
  createStudentInternship: protectedRoute
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        address: z.string(),
        contactPerson: z.string(),
        contactEmail: z.string(),
        contactNo: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        department: z.enum(DEPARTMENTS),
      }),
    )
    .mutation(async ({ input }) => {
      const data = {
        ...input,
      } as createInternship;
      await createStudentInternship({ data });
    }),
  getAllInternships: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    const role = ctx.session!.user.role as roleType;

    return cacheData(`${role}-internships`, async () => {
      return await getAllInternships({ role, userId });
    });
  }),
  getAllInternsDocuments: protectedRoute.query(({ ctx }) => {
    const role = ctx.session!.user.role as roleType;
    const department = ctx.session!.user.department as departmentType;

    return cacheData(`${role}-${department}-documents`, async () => {
      return await getAllInternsDocuments({ role, department });
    });
  }),
});
