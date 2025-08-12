import { insertDocument } from "@/lib/api/internship/student/documents/mutation";
import { createTRPCRouter, protectedRoute } from "../trpc";
import z from "zod";
import { DOCUMENTS } from "@/constants/documents";
import type { departmentType } from "@/constants/departments";
import {
  getAllDocumentsAvailable,
  getAllUpcomingDeadlines,
  getAllUploadedDocuments,
} from "@/lib/api/internship/student/documents/query";
import { getStudentLogProgress } from "@/lib/api/internship/student/progress/query";
import {
  createStudentInternship,
  insertStudentProgress,
} from "@/lib/api/internship/student/progress/mutation";
import { getAllDocumentByDepartment } from "@/lib/api/internship/coordinator/document-review/query";
import { getStudentProgressByDept } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import { getAllInternByDept } from "@/lib/api/internship/coordinator/interns/query";
import { getInternshipStats } from "@/lib/api/internship/coordinator/dashboard/query";
import { createDocument } from "@/lib/api/internship/coordinator/document-review/mutation";

export const internshipRouter = createTRPCRouter({
  /******************************************
   *           Student API Mutations         *
   ******************************************/
  createStudentInternship: protectedRoute
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        contactPerson: z.string(),
        contactEmail: z.string(),
        contactNo: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const studentInternship = {
        userId: ctx.session?.user.id!,
        department: ctx.session?.user.department! as departmentType,
        name: input.name,
        address: input.address,
        contactPerson: input.contactPerson,
        contactEmail: input.contactEmail,
        contactNo: input.contactNo,
        startDate: input.startDate,
        endDate: input.endDate,
      };
      await createStudentInternship(studentInternship);
    }),
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
  getAllDocumentByDepartment: protectedRoute.query(async ({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return await getAllDocumentByDepartment({
      department,
    });
  }),
  //TODO: TO CONSIDER
  getDashboardStats: protectedRoute.query(async ({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return await getInternshipStats({ department });
  }),
  getAllStudentProgressByDept: protectedRoute.query(async ({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return await getStudentProgressByDept({ department });
  }),
  getAllInternByDept: protectedRoute.query(async ({ ctx }) => {
    const department = ctx.session?.user.department! as departmentType;
    return await getAllInternByDept({ department });
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
