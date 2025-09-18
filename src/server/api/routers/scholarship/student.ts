import { cacheData } from "@/lib/redis";
import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllApplications } from "@/lib/api/scholarship/student/my-applications/query";
import z from "zod";
import { submitRenewalApplication } from "@/lib/api/scholarship/student/my-applications/mutation";

export const scholarshipStudentRouter = createTRPCRouter({
  //mutations
  submitRenewal: protectedRoute
    .input(
      z.object({
        applicationId: z.string(),
        requirements: z.record(
          z.string(),
          z.object({
            label: z.string(),
            key: z.string(),
            url: z.string().url(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      await submitRenewalApplication(input);
    }),

  //Queries
  fetchAllApplications: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;

    return cacheData(
      `${userId}-applications`,
      async () => await getAllApplications({ userId }),
    );
  }),
});
