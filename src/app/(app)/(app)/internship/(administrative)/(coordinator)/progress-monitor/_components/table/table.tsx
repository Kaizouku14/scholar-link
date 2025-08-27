"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ProgressMonitoringColumns } from "./column";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";
import { SECTIONS_LABELS } from "@/constants/users/sections";

const ProgressMonitoringTable = () => {
  const { data, isLoading } =
    api.internshipCoordinator.getAllStudentProgressByDept.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ProgressMonitoringColumns}
          data={data}
          filteredTitle={"name"}
          filters={[
            {
              column: "status",
              options: INTERNSHIP_STATUS_LABELS,
            },
            {
              column: "section",
              options: SECTIONS_LABELS,
            },
          ]}
          columnVisibility={{ section: false }}
          viewOptions={false}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ProgressMonitoringTable;
