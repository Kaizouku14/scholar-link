"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { DocumentListColumns } from "./column";
import { api } from "@/trpc/react";

const DocumentListTable = () => {
  const { data, isLoading } =
    api.internshipCoordinator.getAllInternsDocuments.useQuery();

  return (
    <div className="mx-auto mt-4 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={DocumentListColumns}
          data={data}
          filteredTitle={"surname"}
          filteredColumn="status"
          options={[
            {
              label: "Completed",
              value: "completed",
            },
            {
              label: "Pending",
              value: "pending",
            },
          ]}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default DocumentListTable;
