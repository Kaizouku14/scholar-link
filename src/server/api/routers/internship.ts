import { insertDocument } from "@/lib/api/internship/student/documents/mutation";
import { createTRPCRouter, protectedRoute } from "../trpc";
import z from "zod";
import { DOCUMENTS } from "@/constants/documents";
import { DEPARTMENTS, type departmentType } from "@/constants/departments";
import {
  getAllDocumentsAvailable,
  getAllUpcomingDeadlines,
  getAllUploadedDocuments,
} from "@/lib/api/internship/student/documents/query";
import { getStudentLogProgress } from "@/lib/api/internship/student/progress/query";
import { insertStudentProgress } from "@/lib/api/internship/student/progress/mutation";
import { getAllDocumentByDepartment } from "@/lib/api/internship/coordinator/document-review/query";
import { getStudentProgressByDept } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import {
  getAllInternships,
  getAllUserAccount,
  getCompanyRecords,
  getAllInternsDocuments,
} from "@/lib/api/internship/query";
import { getCoordinatorDashboardStats } from "@/lib/api/internship/coordinator/dashboard/query";
import { createDocument } from "@/lib/api/internship/coordinator/document-review/mutation";
import { createStudentInternship } from "@/lib/api/internship/mutation";
import type { createInternship } from "@/interfaces/internship";
import { getAdminDashboardStats } from "@/lib/api/internship/admin/dashboard/query";
import { getAllCompany } from "@/lib/api/internship/admin/company/query";
import { getAllSupervisor } from "@/lib/api/internship/admin/supervisor/query";
import type { roleType } from "@/constants/roles";
import { getAllInternshipDeparments } from "@/lib/api/internship/admin/deparments/query";
import { cacheData } from "@/lib/redis";

export const internshipRouter = createTRPCRouter({
  /******************************************
   *           Student API Mutations         *
   ******************************************/
  insertStudentDocument: protectedRoute
    .input(
      z.object({
        documentType: z.enum(DOCUMENTS),
        documentUrl: z.string(),
        documentKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const document = {
        userId: ctx.session?.user.id!,
        documentType: input.documentType,
        documentUrl: input.documentUrl,
        documentKey: input.documentKey,
      };
      await insertDocument(document);
    }),
  insertStudentProgress: protectedRoute
    .input(
      z.object({
        logDate: z.date(),
        hours: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await insertStudentProgress({
        userId: ctx.session?.user.id!,
        logDate: input.logDate,
        hours: input.hours,
      });
    }),
  /******************************************
   *           Student API Query             *
   ******************************************/
  getUserUploadedDocuments: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id!;
    return await getAllUploadedDocuments({ userId });
  }),
  getStudentLogProgress: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id!;
    return await getStudentLogProgress({ userId });
  }),
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
  getAllDocumentByDepartment: protectedRoute.query(({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return cacheData(
      `${department}-documents`,
      async () =>
        await getAllDocumentByDepartment({
          department,
        }),
    );
  }),
  getCoordinatorDashboardStats: protectedRoute.query(async ({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return await getCoordinatorDashboardStats({ department });
  }),
  getAllStudentProgressByDept: protectedRoute.query(({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return cacheData(
      `${department}-progress`,
      async () => await getStudentProgressByDept({ department }),
    );
  }),
  getCompanyRecords: protectedRoute.query(async () => {
    return await getCompanyRecords();
  }),
  /******************************************
   *             Admin API Query            *
   ******************************************/
  getAdminDashboardStats: protectedRoute.query(() => {
    return cacheData("admin-dashboard", getAdminDashboardStats);
  }),
  getAllCompany: protectedRoute.query(async () => {
    return await cacheData("company", getAllCompany);
  }),
  getAllSupervisor: protectedRoute.query(async () => {
    return await cacheData("supervisor", getAllSupervisor);
  }),
  getAllInternshipDeparments: protectedRoute.query(async () => {
    return await cacheData("departments", getAllInternshipDeparments);
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
    const role = ctx.session?.user.role! as roleType;
    const department = ctx.session?.user.department! as departmentType;

    return cacheData(`${role}-${department}-internships`, async () => {
      return await getAllInternships({ role, department });
    });
  }),
  getAllInternsDocuments: protectedRoute.query(({ ctx }) => {
    const role = ctx.session?.user.role! as roleType;
    const department = ctx.session?.user.department! as departmentType;

    return cacheData(`${role}-${department}-documents`, async () => {
      return await getAllInternsDocuments({ role, department });
    });
  }),
  getAllUserAccount: protectedRoute.query(async ({ ctx }) => {
    const role = ctx.session?.user.role! as roleType;
    const department = ctx.session?.user.department! as departmentType;
    return await getAllUserAccount({ role, department });
  }),
  /******************************************
   *         Global API Mutation/Query       *
   ******************************************/
  getAllDocuments: protectedRoute.query(async () => {
    return await getAllDocumentsAvailable();
  }),
  getAllUpcomingDeadlines: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id!;
    return await getAllUpcomingDeadlines({ userId });
  }),
});
