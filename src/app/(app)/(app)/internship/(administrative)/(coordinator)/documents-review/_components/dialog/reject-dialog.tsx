"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { formatText } from "@/lib/utils";
import { api } from "@/trpc/react";
import { CircleX, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export const RejectDocumentDialog = ({
  documentId,
  receiverId,
  documentType,
  reviewStatus,
}: {
  documentId: string;
  receiverId: string;
  documentType: string;
  reviewStatus?: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>("");
  const formattedDocument = formatText(documentType);

  const { mutateAsync: RejectDocument, isPending } =
    api.internshipCoordinator.rejectInternDocument.useMutation();
  const { refetch } =
    api.internshipCoordinator.getAllDocumentsToReview.useQuery(undefined, {
      enabled: false,
    });
  const handleRejectDocument = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await RejectDocument({
        documentId,
        userId: receiverId,
        receiverId,
        subject: `Document Rejected - [${formattedDocument}]`,
        reason,
      });

      await refetch();
      toast.success("Document rejected successfully.");
      setReason("");
      setOpen(false);
    } catch {
      toast.error("Failed to reject document. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary hover:text-primary/70 flex items-center"
          disabled={reviewStatus === "rejected"}
          onClick={() => setOpen(true)}
        >
          <CircleX className="h-4 w-4" />
          <span>Reject</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleRejectDocument} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2 text-lg font-semibold">
              <CircleX className="h-5 w-5" />
              Confirm Rejection
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Please provide a reason for rejecting this submission. Your
              message will be sent directly to the student&apos;s mailbox.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted rounded-md p-3 text-xs">
            <span className="text-foreground font-medium">Subject: </span>
            <span className="text-muted-foreground">
              Document Rejected - [{formattedDocument}]
            </span>
          </div>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Type your rejection reason here..."
            className="border-input bg-background focus:border-destructive focus:ring-destructive min-h-[6rem] resize-none rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1"
          />

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="default"
              type="submit"
              disabled={isPending}
              className="w-32"
            >
              {isPending ? (
                <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
              ) : (
                "Confirm Reject"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
