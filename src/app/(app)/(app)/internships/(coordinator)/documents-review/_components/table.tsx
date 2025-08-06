import { DataTable } from "@/components/table/data-table";
import { DocumentReviewColumns } from "./columns";

const ReviewDocumentsTable = () => {
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
