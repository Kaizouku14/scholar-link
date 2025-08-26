import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getStudentProgressBySection } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import { getCoordinatorDashboardStats } from "@/lib/api/internship/coordinator/dashboard/query";
import { DEPARTMENTS } from "@/constants/users/departments";
import { getAllCompanyRecords } from "@/lib/api/internship/query";
import { cacheData } from "@/lib/redis";
import z from "zod";
import {
  getAllUserAccount,
  getCoordinatorSections,
} from "@/lib/api/internship/coordinator/hei/query";
import {
  postDocument,
  rejectDocument,
} from "@/lib/api/internship/coordinator/document-review/mutation";
import type { createInternship } from "@/interfaces/internship/internship";
import { insertStudentInternship } from "@/lib/api/internship/mutation";
import { getAllInternsDocumentsBySection } from "@/lib/api/internship/coordinator/document-list/query";
import {
  deleteDocuments,
  getAllDocumentsToReviewBySection,
  getDocuments,
} from "@/lib/api/internship/coordinator/document-review/query";
import { zfd } from "zod-form-data";
import { insertInternshipsXLSX } from "@/lib/api/internship/coordinator/hei/mutation";

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
        duration: z.string(),
        department: z.enum(DEPARTMENTS),
      }),
    )
    .mutation(async ({ input }) => {
      const data = {
        ...input,
      } as createInternship;
      await insertStudentInternship({ data });
    }),
  postDocumentDeadline: protectedRoute
    .input(
      z.object({
        documentType: z.string(),
        deadline: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      await postDocument(input);
    }),
  removeDocument: protectedRoute
    .input(
      z.object({
        documentType: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await deleteDocuments(input.documentType);
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
  uploadInternshipCSV: protectedRoute
    .input(
      zfd.formData({
        file: zfd.file(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const department = ctx.session!.user.department;
      await insertInternshipsXLSX({ file: input.file, department });
    }),
  /******************************************
   *          Coordinator API Query         *
   ******************************************/
  getAllDocuments: protectedRoute.query(() => {
    return cacheData("documents", async () => await getDocuments());
  }),
  getAllDocumentsToReview: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-review-documents`,
      async () =>
        await getAllDocumentsToReviewBySection({
          userId,
        }),
    );
  }),
  getAllInternsDocuments: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-documents`,
      async () =>
        await getAllInternsDocumentsBySection({
          userId,
        }),
    );
  }),
  getCoordinatorDashboardStats: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-stats`,
      async () => await getCoordinatorDashboardStats({ userId }),
    );
  }),
  getAllStudentProgressByDept: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-progress`,
      async () => await getStudentProgressBySection({ userId }),
    );
  }),
  getCompanyRecords: protectedRoute.query(() => {
    return cacheData(
      "company-records",
      async () => await getAllCompanyRecords(),
    );
  }),
  getAllUserAccount: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      "accounts",
      async () => await getAllUserAccount({ userId }),
    );
  }),
  getAllInternships: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(`${userId}-internships`, async () => {
      return await getCoordinatorSections(userId);
    });
  }),
});
