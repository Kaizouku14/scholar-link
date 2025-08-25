"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { CompaniesColumns } from "./column";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";

const CompaniesTable = () => {
  const { data, isLoading } = api.internshipAdmin.getAllCompany.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={CompaniesColumns}
          data={data}
          filteredTitle={"companyName"}
          filters={[
            {
              column: "status",
              options: INTERNSHIP_STATUS_LABELS,
            },
          ]}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default CompaniesTable;
