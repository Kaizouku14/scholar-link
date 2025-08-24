"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { departmentsColumn } from "./column";

const DeparmentsTable = () => {
  const { data, isLoading } =
    api.internshipAdmin.getAllInternshipDeparments.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={departmentsColumn}
          data={data}
          filteredTitle={"deparment"}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default DeparmentsTable;
