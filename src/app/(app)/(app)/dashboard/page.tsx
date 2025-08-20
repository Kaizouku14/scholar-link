import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardSkeleton } from "./_components/helper/dashboard-skeleton";
import CoordinatorDashboard from "./(internship)/internshipCoordinator-dashboard";
import InternshipStudentDashboard from "./(internship)/internshipStudent-dashboard";
import { ROLE, type roleType } from "@/constants/users/roles";
import AdminDashboard from "./(internship)/internshipAdmin-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Pages = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //   const user = session?.user;
  const role = session?.user.role as roleType;

  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Dashboard" />
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
