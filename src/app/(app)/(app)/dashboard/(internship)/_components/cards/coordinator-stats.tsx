"use client";

import { StatCard } from "@/components/cards/status-card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import {
  CheckCircle,
  Clipboard,
  Clock,
  Hourglass,
  Folders,
} from "lucide-react";
import { CoordinatorDocumentReminder } from "./coordinator-reminder";

const CoordinatorDashboardStats = () => {
  const { data: dashboardStats, isLoading: isLoadingStats } =
    api.internshipCoordinator.getCoordinatorDashboardStats.useQuery();
  const { data: coordinatorReminders } =
    api.internshipCoordinator.getAllDocumentReminders.useQuery();

  return (
    <div className="flex flex-col space-y-4">
      {!isLoadingStats && dashboardStats ? (
        <>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
            <StatCard
              title="Assigned Students"
              value={dashboardStats.counts?.studentCount ?? 0}
              subtitle={`${dashboardStats.coordinatorDeparment} Department`}
              icon={<Clipboard className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="Intern's Document"
              value={dashboardStats.counts?.documentsCompletedCount ?? 0}
              subtitle="All documents completed"
              icon={<Folders className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="Pending"
              value={dashboardStats.counts?.pendingCount ?? 0}
              subtitle="Requires your attention"
              icon={<Clock className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="On Going"
              value={dashboardStats.counts?.inProgressCount ?? 0}
              subtitle="Requires your attention"
              icon={<Hourglass className="text-primary h-4 w-4" />}
            />
            <StatCard
              title="Completed"
              value={dashboardStats.counts?.completedCount ?? 0}
              subtitle="Successfully completed"
              icon={<CheckCircle className="text-primary h-4 w-4" />}
            />
          </div>
          <CoordinatorDocumentReminder data={coordinatorReminders} />
        </>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-34 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-100 w-full rounded-xl" />
        </div>
      )}
    </div>
  );
};

export default CoordinatorDashboardStats;
