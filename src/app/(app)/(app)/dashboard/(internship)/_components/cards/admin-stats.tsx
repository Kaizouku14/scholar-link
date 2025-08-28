"use client";

import { StatCard } from "@/components/cards/status-card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageRoutes } from "@/constants/page-routes";
import { api } from "@/trpc/react";
import {
  Briefcase,
  Building,
  Building2,
  CheckCircle,
  Clock,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { useMemo } from "react";
import { ManagementCard } from "./admin-management";

const AdminDashboardStats = () => {
  const { data, isLoading } =
    api.internshipAdmin.getAdminDashboardStats.useQuery();

  console.log(data);

  const monthlyChange = useMemo(() => {
    if (!data) return "N/A";
    const current = data.overview?.monthlyLogs ?? 0;
    const prev = data.overview?.prevMonthlyLogs ?? 0;

    if (prev > 0) {
      const change = ((current - prev) / prev) * 100;
      return `${change >= 0 ? "+" : ""}${change.toFixed(1)}% from last month`;
    }
    return "N/A";
  }, [data]);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {!isLoading && data ? (
          <>
            <StatCard
              title="Total Internships"
              value={data.overview?.totalInternship ?? 0}
              subtitle="Across All Departments"
              icon={<GraduationCap className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="Active Internships"
              value={data.overview?.totalActiveInterns ?? 0}
              subtitle="Currently in Internships"
              icon={<UserCheck className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="Hours Logged (Month)"
              value={data.overview?.monthlyLogs ?? 0}
              subtitle={monthlyChange}
              icon={<Clock className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="Completed"
              value={data.overview?.totalCompletedInterns ?? 0}
              subtitle="Successfully completed"
              icon={<CheckCircle className="text-primary h-4 w-4" />}
            />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={`stat-skeleton-${index}`}
              className="h-34 w-full rounded-xl"
            />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-1.5">
        {!isLoading && data ? (
          <>
            <ManagementCard
              title="Internship Management"
              description="Track active internships"
              total={data.overview?.totalActiveInterns ?? 0}
              totalLabel="Active Internships"
              icon={Briefcase}
              items={data.internshipStats}
              actionLabel="Manage Internships"
              page={PageRoutes.INTERNSHIP_ADMIN_MANAGE_INTERNSHIPS}
            />

            <ManagementCard
              title="Company Management"
              description="Manage partner companies"
              total={data.internshipStats.length}
              totalLabel="Manage Companies"
              icon={Building2}
              items={data.internshipStats}
              actionLabel="Manage Companies"
              page={PageRoutes.INTERNSHIPS_COMPANIES}
            />

            <ManagementCard
              title="Department Management"
              description="Manage all departments"
              total={data.departmentStats.length}
              totalLabel="Manage Department"
              icon={Building}
              items={data.departmentStats}
              actionLabel="Manage Department"
              page={PageRoutes.INTERNSHIPS_DEPARTMENTS}
            />
          </>
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`mgmt-skeleton-${index}`}
              className="h-96 w-full rounded-xl"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboardStats;
