"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ApplicationsColumn } from "./column";
import { api } from "@/trpc/react";
import { getAllYears } from "@/lib/utils";

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
                  label: "Renewal",
                  value: "renewal",
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
              options: getAllYears({ data }),
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
