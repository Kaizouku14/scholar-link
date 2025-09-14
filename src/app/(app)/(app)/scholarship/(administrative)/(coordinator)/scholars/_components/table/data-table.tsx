"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { api } from "@/trpc/react";
import { ScholarsColumns } from "./scholars-columns";
import { getAllYears } from "@/lib/utils";

const ScholarsTable = () => {
  const { data, isLoading } =
    api.scholarshipCoordinator.getAllScholarsByProgram.useQuery();

  console.log(data);

  return (
    <div className="mx-auto mt-4 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ScholarsColumns}
          data={data}
          filteredTitle={"name"}
          columnVisibility={{ year: false }}
          viewOptions={false}
          filters={[
            {
              column: "status",
              options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
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

export default ScholarsTable;
