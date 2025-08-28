"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export const RemoveDocumentAlert = ({
  documentType,
}: {
  documentType: string;
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteDocument, isPending } =
    api.internshipCoordinator.removeDocument.useMutation();

  const handleDeleteDocument = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await deleteDocument({ documentType });
      toast.success("Document deleted successfully.");
      setOpen(false);
    } catch {
      toast.error("Failed to delete document. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mt-7 cursor-pointer" variant="outline" size="icon">
          <Trash2 className="text-primary h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleDeleteDocument}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary flex items-center gap-2">
              <AlertTriangle />
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
