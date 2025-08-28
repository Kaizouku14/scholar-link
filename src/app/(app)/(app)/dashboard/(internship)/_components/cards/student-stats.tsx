"use client";

import { StatCard } from "@/components/cards/status-card";
import { format } from "date-fns";
import { CalendarDays, ChartColumn, Hourglass } from "lucide-react";
import { useMemo } from "react";

interface DashboardStats {
  internshipDetails:
    | {
        companyName: string | null;
        companyAddress: string | null;
        totalHoursRequired: number;
        duration: string;
      }
    | undefined;
  progress: {
    hoursLog: number;
    dateLogs: Date;
    description: string;
  }[];
}

export const InternsDashboardStats = ({
  dashboard,
}: {
  dashboard: DashboardStats;
}) => {
  const statistic = useMemo(() => {
    const progress = dashboard?.progress;
    const noProgress = progress?.length ?? 0;
    const totalHoursRequired =
      dashboard?.internshipDetails?.totalHoursRequired ?? 0;
    const totalHoursLog =
      progress?.reduce((acc, curr) => acc + curr.hoursLog, 0) ?? 0;
    const latestDate = progress?.length
      ? new Date(
          Math.max(...progress.map((log) => new Date(log.dateLogs).getTime())),
        )
      : null;
    const latestHoursLog =
      progress?.reduce((latest, curr) => {
        return new Date(curr.dateLogs) > new Date(latestDate!) ? curr : latest;
      }, progress[0])?.hoursLog ?? 0;

    return {
      totalHoursRequired,
      noProgress,
      totalHoursLog,
      latestDate,
      latestHoursLog,
    };
  }, [dashboard]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        title="Total Hours Required"
        value={statistic.totalHoursRequired}
        subtitle="To complete internship"
        icon={<Hourglass className="text-primary h-4 w-4" />}
      />
      <StatCard
        title="Hours Logged"
        value={statistic.totalHoursLog}
        subtitle={`Across ${statistic.noProgress} sessions Logged`}
        icon={<ChartColumn className="text-primary h-4 w-4" />}
      />
      <StatCard
        title="Latest Session"
        value={statistic.latestHoursLog + "h"}
        subtitle={
          statistic.latestDate
            ? format(statistic?.latestDate ?? "", "MMM dd")
            : "N/A"
        }
        icon={<CalendarDays className="text-primary h-4 w-4" />}
      />
    </div>
  );
};
