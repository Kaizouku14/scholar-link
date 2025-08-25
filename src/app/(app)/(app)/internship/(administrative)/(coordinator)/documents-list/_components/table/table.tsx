"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { DocumentListColumns } from "./column";
import { api } from "@/trpc/react";
import { SECTIONS_LABELS } from "@/constants/users/sections";

const DocumentListTable = () => {
  const { data, isLoading } =
    api.internshipCoordinator.getAllInternsDocuments.useQuery();

  return (
    <div className="mx-auto mt-4 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={DocumentListColumns}
          data={data}
          filteredTitle={"name"}
          filters={[
            {
              column: "status",
              options: [
                {
                  label: "Completed",
                  value: "completed",
                },
                {
                  label: "Pending",
                  value: "pending",
                },
              ],
            },
            {
              column: "section",
              options: SECTIONS_LABELS,
            },
          ]}
          columnVisibility={{ name: false }}
          viewOptions={false}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default DocumentListTable;
