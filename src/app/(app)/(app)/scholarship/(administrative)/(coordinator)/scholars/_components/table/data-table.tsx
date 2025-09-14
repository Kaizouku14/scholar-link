"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { api } from "@/trpc/react";

const ScholarsTable = () => {
  return (
    <div className="mx-auto mt-4 w-full">
      {!false && true ? (
        <DataTable columns={[]} data={[]} filteredTitle={""} />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ScholarsTable;
