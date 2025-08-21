import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllDocumentBySection } from "@/lib/api/internship/coordinator/document-review/query";
import { getStudentProgressByDept } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import { getCoordinatorDashboardStats } from "@/lib/api/internship/coordinator/dashboard/query";
import { createDocument } from "@/lib/api/internship/coordinator/document-review/mutation";
import { DOCUMENTS } from "@/constants/internship/documents";
import type { departmentType } from "@/constants/users/departments";
import { getCompanyRecords } from "@/lib/api/internship/query";
import { cacheData } from "@/lib/redis";
import z from "zod";

export const internshipCoordinatorRouter = createTRPCRouter({
  /******************************************
   *          Coordinator API Mutation      *
   ******************************************/
  createDocument: protectedRoute
    .input(
      z.object({
        documentType: z.enum(DOCUMENTS),
        deadline: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      await createDocument(input);
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
});
