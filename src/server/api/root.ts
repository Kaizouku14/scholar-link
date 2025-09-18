import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { publicRouter } from "./routers/scholarship/public";
import { mailRouter } from "./routers/mail";
import { authRouter } from "./routers/auth";
import { internshipRouter } from "./routers/internship/internships";
import { internshipStudentRouter } from "./routers/internship/student";
import { internshipCoordinatorRouter } from "./routers/internship/coordinator";
import { internshipAdminRouter } from "./routers/internship/admin";
import { scholarshipStudentRouter } from "./routers/scholarship/student";
import { scholarshipCoordinatorRouter } from "./routers/scholarship/coordinator";
import { scholarshipAdminRouter } from "./routers/scholarship/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  //Global API's
  auth: authRouter,
  user: userRouter,
  mail: mailRouter,

  //Internship API's
  internshipStudent: internshipStudentRouter,
  internshipCoordinator: internshipCoordinatorRouter,
  internshipAdmin: internshipAdminRouter,
  internshipUsers: internshipRouter,

  //Scholarship API's
  scholarshipStudent: scholarshipStudentRouter,
  scholarshipCoordinator: scholarshipCoordinatorRouter,
  scholarshipAdmin: scholarshipAdminRouter,

  public: publicRouter,
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
