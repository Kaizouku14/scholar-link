import type { roleType } from "@/constants/users/roles";
import { getAllInternshipsData } from "@/lib/api/internship/query";
import {
  getAllDocumentsAvailable,
  getAllDocumentsDeadlines,
} from "@/lib/api/internship/student/documents/query";
import { cacheData } from "@/lib/redis";
import { createTRPCRouter, protectedRoute } from "../../trpc";

export const internshipRouter = createTRPCRouter({
  /******************************************
   *         Global API Mutation/Query       *
   ******************************************/
  getAllDocuments: protectedRoute.query(async () => {
    return await getAllDocumentsAvailable();
  }),
  getAllUpcomingDeadlines: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await getAllDocumentsDeadlines({ userId });
  }),
  /******************************************
   *   Admin/Coordinator API Mutation/Query *
   ******************************************/
  getAllInternships: protectedRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    const role = ctx.session!.user.role as roleType;

    return cacheData(`${role}-internships`, async () => {
      return await getAllInternshipsData({ role, userId });
    });
  }),
});
