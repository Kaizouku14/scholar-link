import { cacheData } from "@/lib/redis";
import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllApplications } from "@/lib/api/scholarship/student/my-applications/query";
import z from "zod";

export const scholarshipStudentRouter = createTRPCRouter({
  //mutation
  submitRenewal: protectedRoute
    .input(
      z.object({
        programId: z.string(),
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
      console.log(input);
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
