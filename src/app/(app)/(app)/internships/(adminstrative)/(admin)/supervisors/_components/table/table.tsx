"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { SupervisorColumns } from "./column";

const SupervisorTable = () => {
  const { data, isLoading } = api.internships.getAllSupervisor.useQuery();
  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={SupervisorColumns}
          data={data}
          filteredTitle={"supervisorName"}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default SupervisorTable;
