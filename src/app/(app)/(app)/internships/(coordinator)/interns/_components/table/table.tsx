"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { InternsColumns } from "./columns";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/status";

const InternshipTable = () => {
  //   const { data, isLoading } = api.internships.getAllInternByDept.useQuery();

  return (
    <div className="w-full">
      {!false && true ? (
        <DataTable
          columns={InternsColumns}
          data={[]}
          filteredTitle={"companyName"}
          filteredColumn="status"
          options={INTERNSHIP_STATUS_LABELS}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default InternshipTable;
