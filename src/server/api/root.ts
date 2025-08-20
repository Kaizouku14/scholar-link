import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { scholarshipRouter } from "./routers/scholarship";
import { mailRouter } from "./routers/mail";
import { authRouter } from "./routers/auth";
import { internshipRouter } from "./routers/internship/internships";
import { internshipStudentRouter } from "./routers/internship/student";
import { internshipCoordinatorRouter } from "./routers/internship/coordinator";
import { internshipAdminRouter } from "./routers/internship/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  mail: mailRouter,

  scholarships: scholarshipRouter,

  internshipStudent: internshipStudentRouter,
  internshipCoordinator: internshipCoordinatorRouter,
  internshipAdmin: internshipAdminRouter,
  internshipUsers: internshipRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
