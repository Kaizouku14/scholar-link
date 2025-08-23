"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";
import { AdminInternsColumns } from "./column";

const InternshipTable = () => {
  const { data, isLoading } = api.internshipAdmin.getAllInternships.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={AdminInternsColumns}
          data={data}
          filteredTitle={"section"}
          filters={[
            {
              column: "status",
              options: INTERNSHIP_STATUS_LABELS,
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
