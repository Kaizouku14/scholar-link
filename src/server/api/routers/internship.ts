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
    return await getAllUploadedDocuments({ userId: ctx.session?.user.id! });
  }),
  getStudentLogProgress: protectedRoute.query(async ({ ctx }) => {
    return await getStudentLogProgress({ userId: ctx.session?.user.id! });
  }),

  /******************************************
   *         Global API Mutation/Query       *
   ******************************************/
  getAllDocuments: protectedRoute.query(async () => {
    return await getAllDocumentsAvailable();
  }),
  getAllUpcomingDeadlines: protectedRoute.query(async ({ ctx }) => {
    return await getAllUpcomingDeadlines({ userId: ctx.session?.user.id! });
  }),
});
