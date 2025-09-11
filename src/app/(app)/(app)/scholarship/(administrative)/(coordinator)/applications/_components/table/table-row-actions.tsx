"use client";

import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import type { Applications } from "@/interfaces/scholarship/application";

interface DataTableRowActionsProps {
  row: Row<Applications>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const documents = row.original.documents;

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Eye className="h-4 w-4" />
            <span className="ml-1">Review</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Documents</DialogTitle>
            <DialogDescription>
              View the documents uploaded by the applicant
            </DialogDescription>
          </DialogHeader>
          {documents.map((document) => (
            <a
              key={document.id}
              href={document.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {document.id}
            </a>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
