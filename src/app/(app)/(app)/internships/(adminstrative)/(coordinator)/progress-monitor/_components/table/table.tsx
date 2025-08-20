"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ProgressMonitoringColumns } from "./column";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";

const ProgressMonitoringTable = () => {
  const { data, isLoading } =
    api.internships.getAllStudentProgressByDept.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ProgressMonitoringColumns}
          data={data}
          filteredTitle={"surname"}
          filteredColumn="status"
          options={INTERNSHIP_STATUS_LABELS}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ProgressMonitoringTable;
