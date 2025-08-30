"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { ReportsColumn } from "./column";
import { DEPARMENT_FILTER } from "@/constants/users/departments";
import { COURSE_FILTER } from "@/constants/users/courses";
import type { Table } from "@tanstack/react-table";
import type { ReportSchema } from "./column-schema";
import { exportByCoordinator } from "./export-xlsx";

const ReportsTable = () => {
  const { data, isLoading } =
    api.internshipAdmin.getInternshipReports.useQuery();

  const handleExport = async (row: Table<ReportSchema>) => {
    const rows = row.getRowModel().rows.map((r) => r.original);
    await exportByCoordinator(rows);
  };

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={ReportsColumn}
          data={data}
          filteredTitle={"studentName"}
          columnVisibility={{ course: false }}
          onExport={handleExport}
          filters={[
            {
              column: "department",
              options: DEPARMENT_FILTER,
            },
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
