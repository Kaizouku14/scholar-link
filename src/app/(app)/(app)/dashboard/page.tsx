import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import StudentDashboard from "./_components/internship/student-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Dashboard" />

      <div className="flex flex-col gap-1">
        <div className="text-2xl">Welcome, {"John Doe"}</div>
        <div className="text-muted-foreground">
          Current Term: {"2nd Semester"}, {"AY 2023-2024"}
        </div>
      </div>

      <StudentDashboard />
    </div>
  );
};

export default Pages;
