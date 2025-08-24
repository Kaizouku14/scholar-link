"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";
import { CoordinatorInternsColumns } from "./column";
import { SECTIONS_LABELS } from "@/constants/users/sections";

const InternshipTable = () => {
  const { data, isLoading } =
    api.internshipCoordinator.getAllInternships.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={CoordinatorInternsColumns}
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
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default InternshipTable;
