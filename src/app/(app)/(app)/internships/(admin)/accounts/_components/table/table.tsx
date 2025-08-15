"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { AccountColumns } from "./column";
import ActivateEmail from "../activate-email";
import { Separator } from "@/components/ui/separator";

const AccountsTable = () => {
  const { data, isLoading, refetch } =
    api.auth.getAllInternshipAccounts.useQuery();

  return (
    <div className="w-full space-y-4">
      {!isLoading && data ? (
        <>
          <ActivateEmail refetch={refetch} />
          <Separator />
          <DataTable
            columns={AccountColumns}
            data={data}
            filteredTitle={"studentNo"}
            refetch={refetch}
          />
        </>
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default AccountsTable;
