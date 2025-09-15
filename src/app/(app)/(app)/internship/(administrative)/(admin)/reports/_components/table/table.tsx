"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ReportsColumn } from "./column";
import { COURSE_FILTER } from "@/constants/users/courses";
import type { Table } from "@tanstack/react-table";
import { exportByCoordinator } from "./export-xlsx";
import type { Reports } from "@/interfaces/internship/reports";

const ReportsTable = () => {
  const { data, isLoading } =
    api.internshipAdmin.getInternshipReports.useQuery();

  const handleExport = async (row: Table<Reports>) => {
    const rows = row.getFilteredRowModel().rows.map((r) => r.original);

    await exportByCoordinator(rows);
  };

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ReportsColumn}
          data={data}
          filteredTitle={"studentName"}
          onExport={handleExport}
          viewOptions={false}
          filters={[
            {
              column: "course",
              options: COURSE_FILTER,
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
