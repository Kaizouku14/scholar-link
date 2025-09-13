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
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

interface ViewDocumentProps {
  row: Row<Applications>;
}

export function ViewDocuments({ row }: ViewDocumentProps) {
  const { documents, name, programName, email, applicationId } = row.original;
  const [open, setOpen] = useState<boolean>(false);
  const [reviewedDocuments, setReviewedDocuments] = useState<Set<string>>(
    () =>
      new Set(documents.filter((doc) => doc.reviewStatus).map((doc) => doc.id)),
  );
  const { mutateAsync: markAsReview } =
    api.scholarshipCoordinator.markAsReiviewed.useMutation();
  const { mutateAsync: markAsQualified, isPending } =
    api.scholarshipCoordinator.markStudentAsQualified.useMutation();
  const { refetch } =
    api.scholarshipCoordinator.getAllScholarsApplications.useQuery(undefined, {
      enabled: false,
    });

  const toggleDocumentReview = async (documentId: string) => {
    const isNowReviewed = !reviewedDocuments.has(documentId);

    // optimistic update
    setReviewedDocuments((prev) => {
      const newSet = new Set(prev);
      if (isNowReviewed) {
        newSet.add(documentId);
      } else {
        newSet.delete(documentId);
      }
      return newSet;
    });

    try {
      await markAsReview({ documentId, reviewStatus: isNowReviewed });
    } catch {
      // rollback on error
      setReviewedDocuments((prev) => {
        const reverted = new Set(prev);
        if (isNowReviewed) {
          reverted.delete(documentId);
        } else {
          reverted.add(documentId);
        }
        return reverted;
      });
    }
  };
  const allDocumentsReviewed =
    documents.length > 0 && reviewedDocuments.size === documents.length;

  const handleMarkAsQualified = async () => {
    const toastId = toast.loading("Marking as qualified...");
    try {
      if (allDocumentsReviewed) {
        await markAsQualified({ applicationId, name, programName, email });
        await refetch();
        setOpen(false);
        toast.success("Application marked as qualified!");
      } else {
        toast.error(
          "All documents must be reviewed before marking as qualified!",
        );
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
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
        <form onSubmit={handleMarkAsQualified} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Review Documents</DialogTitle>
            <DialogDescription>
              View and check off each document as you review them. All documents
              must be reviewed before marking as qualified.
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
                  <div
                    key={document.id}
                    className="border-border bg-muted/20 flex w-full items-center gap-3 rounded-md border p-3"
                  >
                    <Checkbox
                      id={`review-${document.id}`}
                      checked={reviewedDocuments.has(document.id)}
                      onCheckedChange={async () =>
                        await toggleDocumentReview(document.id)
                      }
                      className="flex-shrink-0"
                    />

                    <Button
                      type="button"
                      className="m-0 h-fit flex-1 cursor-pointer border-none p-0 shadow-none"
                      variant="ghost"
                      onClick={() => {
                        window.open(
                          document.url ?? undefined,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }}
                    >
                      <div className="flex w-full items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-md">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span className="text-foreground max-w-[12rem] truncate text-sm font-semibold">
                          {document.label}
                        </span>
                      </div>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <div className="flex w-full items-center justify-between px-2.5">
              <div className="text-muted-foreground text-sm">
                {reviewedDocuments.size} of {documents.length} document
                {documents.length !== 1 && "s"} reviewed
              </div>
              <div className="space-x-1">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button type="submit" className="w-38" disabled={isPending}>
                  {isPending ? (
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
