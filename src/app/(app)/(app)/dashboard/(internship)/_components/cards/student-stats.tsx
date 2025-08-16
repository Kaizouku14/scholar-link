"use client";

import { StatCard } from "@/components/cards/status-card";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { CalendarDays, ChartColumn, Clock, Hourglass } from "lucide-react";
import { useMemo } from "react";

export const InternsDashboardStats = () => {
  const { data: progress } = api.internships.getStudentLogProgress.useQuery();

  const statistic = useMemo(() => {
    const noProgress = progress?.length;
    const totalHoursRequired =
      (progress && progress[0]?.totalHoursRequired) || 0;
    const totalHoursLog =
      progress?.reduce((acc, curr) => acc + curr.hoursLog, 0) || 0;
    const averageHours = progress?.length
      ? (totalHoursLog / progress.length).toFixed(1)
      : 0;

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
      averageHours,
      latestDate,
      latestHoursLog,
    };
  }, [progress]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard
        title="Total Hours Required"
        value={statistic.totalHoursRequired}
        subtitle="To complete internship"
        icon={<Hourglass className="text-primary h-4 w-4" />}
      />
      <StatCard
        title="Total Hours"
        value={statistic.totalHoursLog}
        subtitle={`Across ${statistic.noProgress} sessions Logged`}
        icon={<ChartColumn className="text-primary h-4 w-4" />}
      />
      <StatCard
        title="Average Hours"
        value={statistic.averageHours}
        subtitle="Per session"
        icon={<Clock className="text-primary h-4 w-4" />}
      />
      <StatCard
        title="Latest Session"
        value={statistic.latestHoursLog + "h"}
        subtitle={format(statistic.latestDate!, "MMM dd")}
        icon={<CalendarDays className="text-primary h-4 w-4" />}
      />
    </div>
  );
};
