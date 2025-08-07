"use client";

import { DataTable } from "@/components/table/data-table";
import { DocumentReviewColumns } from "./columns";
import { api } from "@/trpc/react";

const ReviewDocumentsTable = () => {
  const { data } = api.internships.getAllDocumentByDepartment.useQuery();

  console.log(data);
  return (
    <div>
      <DataTable
        columns={DocumentReviewColumns}
        data={[]}
        filteredTitle={"documentType"}
      />
    </div>
  );
};

export default ReviewDocumentsTable;
