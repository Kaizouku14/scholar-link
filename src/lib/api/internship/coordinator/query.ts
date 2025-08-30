import { eq, db } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import { TRPCError } from "@trpc/server";

export const getCoordinatorInfo = async ({ userId }: { userId: string }) => {
  const [coordinator] = await db
    .select({
      section: UserTable.section,
      course: UserTable.course,
      department: UserTable.department,
    })
    .from(UserTable)
    .where(eq(UserTable.id, userId))
    .limit(1);

  if (!coordinator)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Coordinator not found.",
    });

  const coordinatorSections = coordinator?.section ?? [];
  const coordinatorDepartment = coordinator!.department;
  const coordinatorCourse = coordinator?.course;

  return { coordinatorSections, coordinatorDepartment, coordinatorCourse };
};
