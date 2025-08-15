"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { AccountColumns } from "./column";

const AccountsTable = () => {
  const { data, isLoading } = api.auth.getAllInternshipAccounts.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <DataTable
          columns={AccountColumns}
          data={data}
          filteredTitle={"surname"}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default AccountsTable;
