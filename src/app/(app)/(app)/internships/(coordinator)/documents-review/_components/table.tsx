"use client";

import { DataTable } from "@/components/table/data-table";
import { DocumentReviewColumns } from "./columns";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";

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
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ReviewDocumentsTable;
