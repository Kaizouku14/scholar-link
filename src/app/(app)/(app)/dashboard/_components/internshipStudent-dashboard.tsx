"use client";
import { api } from "@/trpc/react";
import EventCalendar from "./helper/event-calendar";

const InternshipStudentDashboard = () => {
  const {
    data: deadlines,
    refetch,
    isLoading,
  } = api.internships.getAllUpcomingDeadlines.useQuery();

  return (
    <div className="flex w-full flex-col gap-2">
      <EventCalendar events={deadlines} />
    </div>
  );
};

export default InternshipStudentDashboard;
