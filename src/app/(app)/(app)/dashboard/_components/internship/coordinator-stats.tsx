"use client";

import { StatCard } from "@/components/cards/status-card";
import { api } from "@/trpc/react";
import { CheckCircle, ClipboardList, Clock, Hourglass } from "lucide-react";
import type { JSX } from "react";

const iconMap: { [key: string]: JSX.Element } = {
  clipboard: <ClipboardList className="text-primary h-4 w-4" />,
  clock: <Clock className="text-primary h-4 w-4" />,
  hourglass: <Hourglass className="text-primary h-4 w-4" />,
  "check-circle": <CheckCircle className="text-primary h-4 w-4" />,
};

const CoordinatorDashboardStats = () => {
  const { data } = api.internships.getDashboardStats.useQuery();

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map((stat, idx) => (
        <StatCard
          key={idx}
          title={stat.title}
          value={stat.value!}
          subtitle={stat.subtitle}
          icon={iconMap[stat.icon]}
        />
      ))}
    </div>
  );
};

export default CoordinatorDashboardStats;
