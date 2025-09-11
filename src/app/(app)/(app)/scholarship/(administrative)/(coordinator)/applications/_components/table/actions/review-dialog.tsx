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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Eye, FileText, LoaderCircle } from "lucide-react";
import type { Applications } from "@/interfaces/scholarship/application";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface DataTableRowActionsProps {
  row: Row<Applications>;
}

export function ViewDocuments({ row }: DataTableRowActionsProps) {
  const documents = row.original.documents;
  const [open, setOpen] = useState<boolean>(false);

  const handleMarkAsQualified = async () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-1 h-4 w-4" />
          Review
        </Button>
      </DialogTrigger>

      <DialogContent className="h-120 max-w-md">
        <form onSubmit={handleMarkAsQualified}>
          <DialogHeader>
            <DialogTitle>Review Documents</DialogTitle>
            <DialogDescription>
              View and open the documents uploaded by the applicant.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-76">
            <div className="flex flex-col gap-1 px-2.5">
              {documents.length === 0 ? (
                <div className="flex h-70 items-center justify-center">
                  <p className="text-muted-foreground py-4 text-sm">
                    No documents uploaded.
                  </p>
                </div>
              ) : (
                documents.map((document) => (
                  <Button
                    key={document.id}
                    className="m-0 h-fit w-full cursor-pointer border-none p-0 shadow-none"
                    variant={"outline"}
                    onClick={() => {
                      window.open(
                        document.url ?? undefined,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                  >
                    <div className="border-border bg-muted/20 flex w-full items-center gap-3 rounded-md border p-3">
                      <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-md">
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="text-foreground text-sm font-semibold">
                        {document.label}
                      </span>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex w-full items-center justify-between px-2.5">
              <div className="text-muted-foreground text-sm">
                Total of {documents.length} document
                {documents.length !== 1 && "s"}
              </div>
              <div className="space-x-1">
                <DialogClose asChild>
                  <Button variant={"outline"}>Close</Button>
                </DialogClose>
                <Button
                  type="submit"
                  //    disabled={isPending}
                  className="w-32"
                >
                  {false ? (
                    <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
                  ) : (
                    "Mark As Qualified"
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
