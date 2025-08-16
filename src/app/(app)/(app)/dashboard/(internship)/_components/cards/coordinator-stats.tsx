"use client";

import { StatCard } from "@/components/cards/status-card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { CheckCircle, Clipboard, Clock, Hourglass } from "lucide-react";

const CoordinatorDashboardStats = () => {
  const { data, isLoading } = api.internships.getDashboardStats.useQuery();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {!isLoading && data ? (
        <>
          <StatCard
            title="Assigned Students"
            value={data.counts?.studentCount || 0}
            subtitle={`${data.department} Department`}
            icon={<Clipboard className="text-primary h-4 w-4" />}
          />
          <StatCard
            title="Pending"
            value={data.counts?.pendingCount || 0}
            subtitle="Requires your attention"
            icon={<Clock className="text-primary h-4 w-4" />}
          />
          <StatCard
            title="In Progess"
            value={data.counts?.inProgressCount || 0}
            subtitle="Requires your attention"
            icon={<Hourglass className="text-primary h-4 w-4" />}
          />
          <StatCard
            title="Completed"
            value={data.counts?.completedCount || 0}
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

export default CoordinatorDashboardStats;
