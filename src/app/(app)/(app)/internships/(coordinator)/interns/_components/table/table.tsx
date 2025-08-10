"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { InternsColumns } from "./columns";

const InternshipTable = () => {
  const { data, isLoading } = api.internships.getAllInternByDept.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={InternsColumns}
          data={data}
          filteredTitle={"companyName"}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default InternshipTable;
