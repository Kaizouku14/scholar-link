"use client";

import { StatCard } from "@/components/cards/status-card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { CheckCircle, Clock, GraduationCap, UserCheck } from "lucide-react";
import { useMemo } from "react";

const AdminDashboardStats = () => {
  const { data, isLoading } =
    api.internshipAdmin.getAdminDashboardStats.useQuery();

  const monthlyChange = useMemo(() => {
    if (!data) return "N/A";
    const current = data.monthlyLogs ?? 0;
    const prev = data.prevMonthlyLogs ?? 0;

    if (prev > 0) {
      const change = ((current - prev) / prev) * 100;
      return `${change >= 0 ? "+" : ""}${change.toFixed(1)}% from last month`;
    }
    return "N/A";
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {!isLoading && data ? (
        <>
          <StatCard
            title="Total Internships"
            value={data.totalInternship ?? 0}
            subtitle="Across All Departments"
            icon={<GraduationCap className="text-primary h-4 w-4" />}
          />
          <StatCard
            title="Active Internships"
            value={data.totalActiveInterns ?? 0}
            subtitle="Currently in Internships"
            icon={<UserCheck className="text-primary h-4 w-4" />}
          />
          <StatCard
            title="Hours Logged (Month)"
            value={data.monthlyLogs ?? 0}
            subtitle={monthlyChange}
            icon={<Clock className="text-primary h-4 w-4" />}
          />
          <StatCard
            title="Completed"
            value={data.totalCompletedInterns ?? 0}
            subtitle="Successfully completed"
            icon={<CheckCircle className="text-primary h-4 w-4" />}
          />
        </>
      ) : (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-34 w-full rounded-xl" />
        ))
      )}
    </div>
  );
};

export default AdminDashboardStats;
