"use client";

import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";
import { CheckCircle } from "lucide-react";
import { RejectDocumentDialog } from "../dialog/reject-dialog";
import type { DocumentSchema } from "./column-schema";
import { api } from "@/trpc/react";
import { toast } from "react-hot-toast";

interface DataTableRowActionsProps {
  row: Row<DocumentSchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { id, studentId, documentType, reviewStatus } = row.original;
  const { mutateAsync: approveDocument } =
    api.internshipCoordinator.approvedInternDocument.useMutation();
  const { refetch } =
    api.internshipCoordinator.getAllDocumentsToReview.useQuery(undefined, {
      enabled: false,
    });

  const handleDocumentApproval = async () => {
    const toastId = toast.loading("Marking as excused...");
    try {
      await approveDocument({ documentId: id });
      toast.success("Internship successfully approved !", { id: toastId });
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        className="cursor-pointer text-green-600 hover:text-green-700"
        onClick={handleDocumentApproval}
      >
        <CheckCircle />
        Approved
      </Button>
      <RejectDocumentDialog
        documentId={id}
        receiverId={studentId}
        documentType={documentType}
        reviewStatus={reviewStatus}
      />
    </div>
  );
}
