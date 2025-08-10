import { StatCard } from "@/components/cards/status-card";
import { CheckCircle, ClipboardList, Clock, Hourglass } from "lucide-react";

const CoordinatorDashboard = () => {
  const stats = [
    {
      title: "Assigned Students",
      value: 10,
      subtitle: "ITDS Department",
      icon: <ClipboardList className="text-primary h-4 w-4" />,
    },
    {
      title: "Pending",
      value: 10,
      subtitle: "Requires your review",
      icon: <Clock className="text-primary h-4 w-4" />,
    },
    {
      title: "In Progress",
      value: 10,
      subtitle: "Requires your attention",
      icon: <Hourglass className="text-primary h-4 w-4" />,
    },
    {
      title: "Completed",
      value: 10,
      subtitle: "Successfully completed",
      icon: <CheckCircle className="text-primary h-4 w-4" />,
    },
  ];

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="mt-2 flex flex-col">
        <span className="text-3xl">Dashboard</span>
        <span className="text-muted-foreground text-sm">
          Overview of your assigned students and internships
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
