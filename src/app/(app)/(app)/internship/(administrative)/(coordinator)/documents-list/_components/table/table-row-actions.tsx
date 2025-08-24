"use client";

import type { Row } from "@tanstack/react-table";
import { CircleCheck, Eye, Minus } from "lucide-react";
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
import type { StudentDocuments } from "@/interfaces/internship/document";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { STATUS } from "@/constants/users/status";

interface DataTableRowActionsProps {
  row: Row<StudentDocuments>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { documents } = row.original;

  const noOfCompleted = documents.filter(
    (doc) => doc.reviewStatus === "completed",
  ).length;

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
          <ScrollArea className="h-96">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left">Document</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {DOCUMENTS.map((doc) => {
                  const submittedDoc = documents.find((d) => d.type === doc);
                  const isSubmitted = Boolean(submittedDoc);
                  const reviewStatus = submittedDoc?.reviewStatus;

                  return (
                    <tr key={doc} className="border-t">
                      <td className="p-2 capitalize">
                        {doc.replaceAll("_", " ")}
                      </td>
                      <td className="flex justify-center p-2 text-center">
                        {reviewStatus === STATUS[1] ? (
                          <CircleCheck className="text-green-800 dark:text-green-500" />
                        ) : (
                          <Minus className="text-muted-foreground" />
                        )}
                      </td>
                      <td className="px-2 py-1">
                        {isSubmitted ? (
                          <Button variant={"outline"} size={"icon"}>
                            <a
                              href={submittedDoc?.url ?? undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : (
                          <Button variant={"outline"} size={"icon"} disabled>
                            <Minus />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </ScrollArea>
        </div>

        <DialogFooter className="w-full">
          <div className="flex w-full items-center justify-between">
            {/* <span className="ml-2 flex items-center gap-1 text-sm font-medium">
              <span className="text-primary">{noOfCompleted}</span>
              <span className="text-muted-foreground">
                / {DOCUMENTS.length}
              </span>
              <span className="text-muted-foreground">completed</span>
            </span> */}
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
