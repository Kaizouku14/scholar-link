import type { Metadata } from "next";
import ApplicationsHeader from "./_components/header";
import ApplicantionsTable from "./_components/table/data-table";

export const metadata: Metadata = {
  title: "Applications",
};

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <ApplicationsHeader />
      <ApplicantionsTable />
    </div>
  );
};

export default Pages;
