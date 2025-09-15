"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";
import { CoordinatorInternsColumns } from "./column";
import { SECTIONS_LABELS } from "@/constants/users/sections";
import { useState } from "react";
import ImportDialog from "@/components/dropdown/import-dialog";

const InternshipTable = () => {
  const { data, isLoading, refetch } =
    api.internshipCoordinator.getAllInternships.useQuery();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const handleImport = () => {
    setIsImportDialogOpen(true);
  };

  const handleImportComplete = async () => {
    setIsImportDialogOpen(false);
    await refetch();
  };

  return (
    <>
      <div className="w-full">
        {!isLoading && data ? (
          <DataTable
            columns={CoordinatorInternsColumns}
            data={data}
            filteredTitle={"name"}
            onImport={handleImport}
            filters={[
              {
                column: "status",
                options: INTERNSHIP_STATUS_LABELS,
              },
              {
                column: "section",
                options: SECTIONS_LABELS,
              },
            ]}
          />
        ) : (
          <DataTableSkeleton />
        )}
      </div>
      <ImportDialog
        isImportDialogOpen={isImportDialogOpen}
        setIsImportDialogOpen={setIsImportDialogOpen}
        handleImportComplete={handleImportComplete}
      />
    </>
  );
};

export default InternshipTable;
