import type { Metadata } from "next";
import ScholarsPageHeader from "./_components/header";
import ScholarsTable from "./_components/table/data-table";

export const metadata: Metadata = {
  title: "Scholars",
};

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <ScholarsPageHeader />
      <ScholarsTable />
    </div>
  );
};

export default Pages;
