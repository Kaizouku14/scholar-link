import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardSkeleton } from "./_components/helper/dashboard-skeleton";
import CoordinatorDashboard from "./(internship)/internshipCoordinator-dashboard";
import InternshipStudentDashboard from "./(internship)/internshipStudent-dashboard";
import { ROLE, type roleType } from "@/constants/users/roles";
import AdminDashboard from "./(internship)/internshipAdmin-dashboard";

// export const dynamic = "force-dynamic"; // disables static caching for this page
export const metadata: Metadata = {
  title: "Dashboard",
};

const Pages = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = session?.user.role as roleType;

  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      {role === ROLE.INTERNSHIP_STUDENT ? (
        <InternshipStudentDashboard />
      ) : role === ROLE.INTERNSHIP_COORDINATOR ? (
        <CoordinatorDashboard />
      ) : role === ROLE.INTERNSHIP_ADMIN ? (
        <AdminDashboard />
      ) : (
        <DashboardSkeleton />
      )}
    </div>
  );
};

export default Pages;
