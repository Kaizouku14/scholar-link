"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { MoaColumns } from "./column";
import { api } from "@/trpc/react";
import { SECTIONS_LABELS } from "@/constants/users/sections";
import { COURSE_FILTER } from "@/constants/users/courses";

const InternsMoaTable = () => {
  const { data, isLoading } = api.internshipAdmin.getAllInternsMoa.useQuery();

  return (
    <div className="mx-auto mt-4 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={MoaColumns}
          data={data}
          filteredTitle={"name"}
          filters={[
            {
              column: "course",
              options: COURSE_FILTER,
            },
            {
              column: "section",
              options: SECTIONS_LABELS,
            },
          ]}
          columnVisibility={{ course: false, section: false }}
          viewOptions={false}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default InternsMoaTable;
