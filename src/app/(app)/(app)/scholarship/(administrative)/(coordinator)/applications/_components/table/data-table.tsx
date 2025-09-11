"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ApplicationsColumn } from "./column";
import { api } from "@/trpc/react";

const ApplicantionsTable = () => {
  const { data, isLoading } =
    api.scholarshipCoordinator.getAllScholarsApplications.useQuery();

  return (
    <div className="mx-auto mt-4 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ApplicationsColumn}
          data={data}
          filteredTitle={"name"}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ApplicantionsTable;
