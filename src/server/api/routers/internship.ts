import { insertDocument } from "@/lib/api/internship/student/documents/mutation";
import { createTRPCRouter, protectedRoute } from "../trpc";
import z from "zod";
import { DOCUMENTS } from "@/constants/documents";
import {
  getAllDocumentsAvailable,
  getAllUpcomingDeadlines,
  getAllUploadedDocuments,
} from "@/lib/api/internship/student/documents/query";
import { insertStudentProgress } from "@/lib/api/internship/student/progress/mutation";

export const internshipRouter = createTRPCRouter({
  //Student Routes
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

      return await insertDocument(document);
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

  getUserUploadedDocuments: protectedRoute.query(async ({ ctx }) => {
    return await getAllUploadedDocuments({ userId: ctx.session?.user.id! });
  }),

  //global
  getAllDocuments: protectedRoute.query(async () => {
    return await getAllDocumentsAvailable();
  }),
  getAllUpcomingDeadlines: protectedRoute.query(async ({ ctx }) => {
    return await getAllUpcomingDeadlines({ userId: ctx.session?.user.id! });
  }),
});
