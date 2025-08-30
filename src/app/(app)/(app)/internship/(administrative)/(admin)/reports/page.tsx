import type { Metadata } from "next";
import ReportsHeader from "./_components/header";
import ReportsTable from "./_components/table/table";

export const metadata: Metadata = {
  title: "Reports",
};

const Pages = () => {
  return (
    <div className="container h-auto w-full space-y-4">
      <ReportsHeader />
      <ReportsTable />
    </div>
  );
};

export default Pages;
