"use client";

import { DataTable } from "@/components/table/data-table";
import { DocumentReviewColumns } from "./columns";
import { api } from "@/trpc/react";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { STATUS_LABELS } from "@/constants/users/status";
import UpcomingDeadlines from "@/components/cards/internship/upcoming-deadlines";
import DocumentForm from "../form/document-form";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewDocumentsTable = () => {
  const { data, isLoading } =
    api.internshipCoordinator.getAllDocumentsToReview.useQuery();

  return (
    <div className="mx-auto w-full">
      {!isLoading && data ? (
        <div className="flex flex-col space-y-6">
          <div className="flex gap-2">
            <UpcomingDeadlines />
            <DocumentForm />
          </div>
          <Separator />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                Intern&apos;s Documents
              </span>
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
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-80 w-full max-w-md rounded-xl" />
            <Skeleton className="w-full rounded-xl" />
          </div>
          <DataTableSkeleton />
        </div>
      )}
    </div>
  );
};

export default ReviewDocumentsTable;
