"use client";

import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { INTERNSHIP_STATUS_LABELS } from "@/constants/users/status";
import { AdminInternsColumns } from "./column";
import { COURSE_FILTER } from "@/constants/users/courses";
import { useState } from "react";
import ImportDialog from "@/components/dropdown/import-dialog";

const InternshipTable = () => {
  const { data, isLoading, refetch } =
    api.internshipAdmin.getAllInternships.useQuery();
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
            columns={AdminInternsColumns}
            data={data}
            filteredTitle={"course"}
            filters={[
              {
                column: "status",
                options: INTERNSHIP_STATUS_LABELS,
              },
              {
                column: "course",
                options: COURSE_FILTER,
              },
            ]}
            onImport={handleImport}
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
