"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";

const ProgressMonitoringTable = () => {
  const { data, isLoading } =
    api.internships.getAllStudentProgressByDept.useQuery();

  console.log(data);
  return (
    <div className="w-full">
      {!true && true ? (
        <DataTable columns={[]} data={[]} filteredTitle={""} />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ProgressMonitoringTable;
