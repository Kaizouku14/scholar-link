"use client";
import { api } from "@/trpc/react";
import EventCalendar from "./helper/event-calendar";
import { InternsDashboardStats } from "./internship/student-stats";
import { Skeleton } from "@/components/ui/skeleton";
import UpcomingDeadlines from "@/components/cards/upcoming-deadlines";

const InternshipStudentDashboard = () => {
  const { data: deadlines, isLoading } =
    api.internships.getAllUpcomingDeadlines.useQuery();

  return (
    <div className="flex w-full flex-col space-y-4">
      {isLoading ? (
        <>
          <div className="mt-2 flex flex-col gap-2">
            <Skeleton className="h-10 w-44 rounded-xl" />
            <Skeleton className="h-4 w-80 rounded-xl" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-34 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-[calc(100vh-200px)] w-full rounded-xl" />
        </>
      ) : (
        <>
          <div className="mt-2 flex flex-col">
            <span className="text-3xl">Dashboard</span>
            <span className="text-muted-foreground text-sm">
              Overview of your internship progress and deadlines.
            </span>
          </div>
          <InternsDashboardStats />
          {/* TODO: TO CONSIDER */}
          <div className="hidden md:flex">
            <EventCalendar events={deadlines} />
          </div>
          <div className="flex md:hidden">
            <UpcomingDeadlines />
          </div>
        </>
      )}
    </div>
  );
};

export default InternshipStudentDashboard;
