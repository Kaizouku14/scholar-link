"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ReportsColumn } from "./column";
import { DEPARMENT_FILTER } from "@/constants/users/departments";

const ReportsTable = () => {
  const { data, isLoading } =
    api.internshipAdmin.getInternshipReports.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ReportsColumn}
          data={data}
          filteredTitle={"studentName"}
          className=""
          filters={[
            {
              column: "department",
              options: DEPARMENT_FILTER,
            },
          ]}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ReportsTable;
