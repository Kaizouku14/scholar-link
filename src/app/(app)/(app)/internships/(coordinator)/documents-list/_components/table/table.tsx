"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const DocumentListTable = () => {
  return (
    <div className="mx-auto mt-4 w-full">
      {!false && true ? (
        <DataTable columns={[]} data={[]} filteredTitle={"surname"} />
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-80 w-full max-w-md rounded-xl" />
            <Skeleton className="w-full rounded-xl" />
          </div>
          <DataTableSkeleton />
        </div>
      )}
    </div>
  );
};

export default DocumentListTable;
