import {
  getAllDocumentsAvailable,
  getAllDocumentsDeadlines,
} from "@/lib/api/internship/student/documents/query";
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
});
