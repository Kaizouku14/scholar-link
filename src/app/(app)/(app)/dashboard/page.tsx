import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CoordinatorDashboard from "./_components/coordinator-dashboard";
import InternshipStudentDashboard from "./_components/internshipStudent-dashboard";
import { DashboardSkeleton } from "./_components/helper/dashboard-skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Pages = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const role = session?.user.role;

  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Dashboard" />
      {role === "internshipCoordinator" ? (
        <CoordinatorDashboard />
      ) : role === "internshipStudent" ? (
        <InternshipStudentDashboard />
      ) : (
        <DashboardSkeleton />
      )}
    </div>
  );
};

export default Pages;
