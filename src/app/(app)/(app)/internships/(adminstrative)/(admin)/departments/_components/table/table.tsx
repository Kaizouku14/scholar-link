"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";

const DeparmentsTable = () => {
  const { data, isLoading } =
    api.internships.getAllInternshipDeparments.useQuery();

  console.log(data);
  return (
    <div className="w-full">
      {!false && true ? (
        <DataTable columns={[]} data={[]} filteredTitle={"companyName"} />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default DeparmentsTable;
