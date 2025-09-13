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
          viewOptions={false}
          columnVisibility={{ year: false }}
          filters={[
            {
              column: "status",
              options: [
                {
                  label: "Pending",
                  value: "pending",
                },
                {
                  label: "Qualified",
                  value: "qualified",
                },
                {
                  label: "Rejected",
                  value: "rejected",
                },
              ],
            },
            {
              column: "year",
              options: Array.from(new Set(data.map((y) => y.appliedAt))) // unique years
                .sort(
                  (a: Date, b: Date) =>
                    new Date(b).getTime() - new Date(a).getTime(),
                ) // latest first
                .map((year) => ({
                  label: new Date(year).getFullYear().toString(),
                  value: new Date(year).getFullYear().toString(),
                })),
            },
          ]}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ApplicantionsTable;
