"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { CompaniesColumns } from "./column";

const CompaniesTable = () => {
  const { data, isLoading } = api.internshipAdmin.getAllCompany.useQuery();

  console.log(data);
  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={CompaniesColumns}
          data={data}
          filteredTitle={"companyName"}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default CompaniesTable;
