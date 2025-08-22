"use client";

import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";
import { CheckCircle } from "lucide-react";
import { RejectDocumentDialog } from "../dialog/reject-dialog";
import type { DocumentSchema } from "./column-schema";

interface DataTableRowActionsProps {
  row: Row<DocumentSchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { id, studentId, documentType } = row.original;

  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        className="cursor-pointer text-green-600 hover:text-green-700"
      >
        <CheckCircle />
        Approved
      </Button>
      <RejectDocumentDialog
        documentId={id}
        receiverId={studentId}
        documentType={documentType}
      />
    </div>
  );
}
