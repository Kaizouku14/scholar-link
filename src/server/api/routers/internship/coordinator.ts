import { createTRPCRouter, adminRoute } from "../../trpc";
import { getStudentProgressBySection } from "@/lib/api/internship/coordinator/progress-monitoring/query";
import {
  getCoordinatorDashboardStats,
  getReminderForDocuments,
} from "@/lib/api/internship/coordinator/dashboard/query";
import { DEPARTMENTS } from "@/constants/users/departments";
import { getAllCompanyRecords } from "@/lib/api/internship/query";
import { cacheData } from "@/lib/redis";
import z from "zod";
import {
  getAllUserAccount,
  getCoordinatorSections,
} from "@/lib/api/internship/coordinator/hei/query";
import {
  approvedDocument,
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
import {
  cancelInternship,
  deleteInternship,
  insertInternshipsXLSX,
} from "@/lib/api/internship/coordinator/hei/mutation";
import { markAsExcused } from "@/lib/api/internship/coordinator/progress-monitoring/mutation";

export const internshipCoordinatorRouter = createTRPCRouter({
  /******************************************
   *          Coordinator API Mutation      *
   ******************************************/
  createStudentInternship: adminRoute
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
  postDocumentDeadline: adminRoute
    .input(
      z.object({
        documentType: z.string(),
        deadline: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      await postDocument(input);
    }),
  removeDocument: adminRoute
    .input(
      z.object({
        documentType: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await deleteDocuments(input.documentType);
    }),
  approvedInternDocument: adminRoute
    .input(
      z.object({
        documentId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await approvedDocument(input);
    }),
  rejectInternDocument: adminRoute
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
  uploadInternshipXLSX: adminRoute
    .input(
      zfd.formData({
        file: zfd.file(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const department = ctx.session!.user.department;
      return await insertInternshipsXLSX({
        file: input.file,
        department,
      });
    }),
  cancelStudentInternship: adminRoute
    .input(
      z.object({
        internshipId: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      await cancelInternship(input.internshipId);
    }),
  deleteStudentInternship: adminRoute
    .input(
      z.object({
        internshipId: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      await deleteInternship(input.internshipId);
    }),
  markStudenAsExcused: adminRoute
    .input(
      z.object({
        internshipId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await markAsExcused(input);
    }),

  /******************************************
   *          Coordinator API Query         *
   ******************************************/
  getAllDocuments: adminRoute.query(() => {
    return cacheData("documents", async () => await getDocuments());
  }),
  getAllDocumentsToReview: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-review-documents`,
      async () =>
        await getAllDocumentsToReviewBySection({
          userId,
        }),
    );
  }),
  getAllInternsDocuments: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-documents`,
      async () =>
        await getAllInternsDocumentsBySection({
          userId,
        }),
    );
  }),
  getCoordinatorDashboardStats: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-stats`,
      async () => await getCoordinatorDashboardStats({ userId }),
    );
  }),
  getAllDocumentReminders: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-reminders`,
      async () => await getReminderForDocuments({ userId }),
    );
  }),
  getAllStudentProgressByDept: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-progress`,
      async () => await getStudentProgressBySection({ userId }),
    );
  }),
  getCompanyRecords: adminRoute.query(() => {
    return cacheData(
      "company-records",
      async () => await getAllCompanyRecords(),
    );
  }),
  getAllUserAccount: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      "accounts",
      async () => await getAllUserAccount({ userId }),
    );
  }),
  getAllInternships: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(`${userId}-internships`, async () => {
      return await getCoordinatorSections(userId);
    });
  }),
});
