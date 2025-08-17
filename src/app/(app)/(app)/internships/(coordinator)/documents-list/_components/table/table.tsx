"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { DocumentListColumns } from "./column";

const DocumentListTable = () => {
  const { data, isLoading } =
    api.internships.getAllInternsDocumentsByDept.useQuery();

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
