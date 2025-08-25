import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getStudentProgressBySection } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import { getCoordinatorDashboardStats } from "@/lib/api/internship/coordinator/dashboard/query";
import {
  DEPARTMENTS,
  type departmentType,
} from "@/constants/users/departments";
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
  /******************************************
   *          Coordinator API Query         *
   ******************************************/
  getAllDocuments: protectedRoute.query(() => {
    return cacheData("documents", async () => await getDocuments());
  }),
  getAllDocumentsToReview: protectedRoute.query(({ ctx }) => {
    const id = ctx.session!.user.id;
    return cacheData(
      `${id}-review-documents`,
      async () =>
        await getAllDocumentsToReviewBySection({
          id,
        }),
    );
  }),
  getAllInternsDocuments: protectedRoute.query(({ ctx }) => {
    const id = ctx.session!.user.id;
    return cacheData(
      `${id}-documents`,
      async () =>
        await getAllInternsDocumentsBySection({
          id,
        }),
    );
  }),
  getCoordinatorDashboardStats: protectedRoute.query(({ ctx }) => {
    const department = ctx.session!.user.department as departmentType;
    return cacheData(
      `${department}-stats`,
      async () => await getCoordinatorDashboardStats({ department }),
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
