"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { departmentsColumn } from "./column";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";

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
          filteredColumn="status"
          options={INTERNSHIP_STATUS_LABELS}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default DeparmentsTable;
