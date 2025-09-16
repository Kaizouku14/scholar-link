import { cacheData } from "@/lib/redis";
import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllApplications } from "@/lib/api/scholarship/student/my-applications/query";

export const scholarshipStudentRouter = createTRPCRouter({
  //Queries
  fetchAllApplications: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;

    return cacheData(
      `${userId}-applications`,
      async () => await getAllApplications({ userId }),
    );
  }),
});
