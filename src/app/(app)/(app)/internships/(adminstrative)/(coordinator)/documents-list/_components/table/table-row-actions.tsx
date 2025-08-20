"use client";

import type { Row } from "@tanstack/react-table";
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DocumentListColumn } from "./column-schema";
import { DOCUMENTS } from "@/constants/internship/documents";
import { Badge } from "@/components/ui/badge";
import { cn, getStatusColor, getStatusVariant } from "@/lib/utils";

interface DataTableRowActionsProps {
  row: Row<DocumentListColumn>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { documents } = row.original;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm">View</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Intern Documents</DialogTitle>
          <DialogDescription>
            Submitted and pending documents for this intern
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-2 text-left">Document</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map((doc) => {
                const submittedDoc = documents.find((d) => d.type === doc);
                const isSubmitted = Boolean(submittedDoc);
                const reviewStatus = submittedDoc?.status;
                const variant = reviewStatus && getStatusVariant(reviewStatus);
                const color = reviewStatus && getStatusColor(reviewStatus);

                return (
                  <tr key={doc} className="border-t">
                    <td className="p-2 capitalize">
                      {doc.replaceAll("_", " ")}
                    </td>
                    <td className="p-2 text-center">
                      {reviewStatus ? (
                        <Badge
                          variant={variant}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
                            color,
                          )}
                        >
                          {reviewStatus === "pending" ? (
                            <Clock className={cn("h-4 w-4", color)} />
                          ) : reviewStatus === "approved" ? (
                            <CheckCircle className={cn("h-4 w-4", color)} />
                          ) : (
                            <XCircle className={cn("h-4 w-4", color)} />
                          )}
                          {reviewStatus}
                        </Badge>
                      ) : (
                        <div>—</div>
                      )}
                    </td>
                    <td className="px-2 py-1">
                      {isSubmitted ? (
                        <Button variant={"outline"} size={"icon"}>
                          <a
                            href={submittedDoc?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <Button variant={"outline"} size={"icon"} disabled>
                          —
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
