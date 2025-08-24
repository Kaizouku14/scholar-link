import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getStudentLogProgress } from "@/lib/api/internship/student/progress/query";
import {
  insertStudentProgress,
  updateStudentLogProgress,
} from "@/lib/api/internship/student/progress/mutation";
import { insertDocument } from "@/lib/api/internship/student/documents/mutation";
import { getAllUploadedDocuments } from "@/lib/api/internship/student/documents/query";
import z from "zod";

export const internshipStudentRouter = createTRPCRouter({
  /******************************************
   *           Student API Mutations         *
   ******************************************/
  insertStudentDocument: protectedRoute
    .input(
      z.object({
        documentType: z.string(),
        documentUrl: z.string(),
        documentKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const document = {
        userId: ctx.session!.user.id,
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
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await insertStudentProgress({
        userId: ctx.session!.user.id,
        ...input,
      });
    }),
  updateStudentLogProgress: protectedRoute
    .input(
      z.object({
        id: z.string(),
        hoursLog: z.number(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateStudentLogProgress({ ...input });
    }),
  /******************************************
   *           Student API Query             *
   ******************************************/
  getUserUploadedDocuments: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await getAllUploadedDocuments({ userId });
  }),
  getStudentLogProgress: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await getStudentLogProgress({ userId });
  }),
});
