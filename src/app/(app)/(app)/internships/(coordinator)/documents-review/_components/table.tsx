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
        <DataTable
          columns={DocumentReviewColumns}
          data={data}
          columnVisibility={{
            id: false,
          }}
          filteredTitle={"documentType"}
          filteredColumn="reviewStatus"
          options={STATUS_LABELS}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ReviewDocumentsTable;
