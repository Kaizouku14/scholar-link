"use client";

import { DataTable } from "@/components/table/data-table";
import { DocumentReviewColumns } from "./columns";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { STATUS_LABELS } from "@/constants/status";

const ReviewDocumentsTable = () => {
  const { data, isLoading } =
    api.internships.getAllDocumentByDepartment.useQuery();

  return (
    <div className="w-full">
      {!isLoading && data ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="text-2xl font-bold"> Intern's Documents</span>
            <span className="text-muted-foreground text-sm">
              Documents to review
            </span>
          </div>
          <DataTable
            columns={DocumentReviewColumns}
            data={data}
            columnVisibility={{
              id: false,
            }}
            filteredTitle={"surname"}
            filteredColumn="reviewStatus"
            options={STATUS_LABELS}
          />
        </div>
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ReviewDocumentsTable;
