"use client";

import { StatCard } from "@/components/cards/status-card";
import { format } from "date-fns";
import { CalendarDays, ChartColumn, Clock, Hourglass } from "lucide-react";
import { useMemo } from "react";
import type { InternsStats } from "@/interfaces/internship/dashboard";

export const InternsDashboardStats = ({
  dashboard,
}: {
  dashboard: InternsStats;
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
    const remainingHours = Math.max(totalHoursRequired - totalHoursLog, 0);

    return {
      totalHoursRequired,
      noProgress,
      totalHoursLog,
      latestDate,
      latestHoursLog,
      remainingHours,
    };
  }, [dashboard]);

  const stats = [
    {
      title: "Total Hours Required",
      value: statistic.totalHoursRequired,
      subtitle: "To complete internship",
      icon: <Clock className="text-primary h-4 w-4" />,
    },

    {
      title: "Hours Logged",
      value: statistic.totalHoursLog,
      subtitle: `Across ${statistic.noProgress} sessions Logged`,
      icon: <ChartColumn className="text-primary h-4 w-4" />,
    },
    {
      title: "Latest Session",
      value: statistic.latestHoursLog + "h",
      subtitle: statistic.latestDate
        ? format(statistic.latestDate, "MMM dd")
        : "N/A",
      icon: <CalendarDays className="text-primary h-4 w-4" />,
    },
    {
      title: "Remaining Hours",
      value: statistic.remainingHours,
      subtitle: "Hours left to finish",
      icon: <Hourglass className="text-primary h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};
