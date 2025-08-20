"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { DocumentListColumns } from "./column";

const DocumentListTable = () => {
  return (
    <div className="mx-auto mt-4 w-full">
      {!false && true ? (
        <DataTable
          columns={DocumentListColumns}
          data={[]}
          filteredTitle={"studentNo"}
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
