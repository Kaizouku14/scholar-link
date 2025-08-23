import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllDocumentBySection } from "@/lib/api/internship/coordinator/document-review/query";
import { getStudentProgressByDept } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import { getCoordinatorDashboardStats } from "@/lib/api/internship/coordinator/dashboard/query";
import { DOCUMENTS } from "@/constants/internship/documents";
import {
  DEPARTMENTS,
  type departmentType,
} from "@/constants/users/departments";
import { getCompanyRecords } from "@/lib/api/internship/query";
import { cacheData } from "@/lib/redis";
import z from "zod";
import { getAllUserAccount } from "@/lib/api/internship/coordinator/hei/query";
import {
  postDocument,
  rejectDocument,
} from "@/lib/api/internship/coordinator/document-review/mutation";
import type { createInternship } from "@/interfaces/internship/internship";
import { createStudentInternship } from "@/lib/api/internship/mutation";

export const internshipCoordinatorRouter = createTRPCRouter({
  /******************************************
   *          Coordinator API Mutation      *
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
  postDocumentDeadline: protectedRoute
    .input(
      z.object({
        documentType: z.enum(DOCUMENTS),
        deadline: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      await postDocument(input);
    }),
  rejectInternDocument: protectedRoute
    .input(
      z.object({
        documentId: z.string(),
        userId: z.string(),
        receiverId: z.string(),
        subject: z.string(),
        reason: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session!.user.id;
      await rejectDocument({ ...input, userId: id });
    }),
  /******************************************
   *          Coordinator API Query         *
   ******************************************/
  getAllDocumentBySections: protectedRoute.query(({ ctx }) => {
    const id = ctx.session!.user.id;
    return cacheData(
      `${id}-documents`,
      async () =>
        await getAllDocumentBySection({
          id,
        }),
    );
  }),
  getCoordinatorDashboardStats: protectedRoute.query(async ({ ctx }) => {
    const department = ctx.session!.user.department as departmentType;
    return await getCoordinatorDashboardStats({ department });
  }),
  getAllStudentProgressByDept: protectedRoute.query(({ ctx }) => {
    const department = ctx.session!.user.department as departmentType;
    return cacheData(
      `${department}-progress`,
      async () => await getStudentProgressByDept({ department }),
    );
  }),
  getCompanyRecords: protectedRoute.query(async () => {
    return await getCompanyRecords();
  }),
  getAllUserAccount: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await getAllUserAccount({ userId });
  }),
});
