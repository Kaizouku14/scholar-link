"use client";

import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import type { Applications } from "@/interfaces/scholarship/application";
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
import { LoaderCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

interface DataTableRowActionsProps {
  row: Row<Applications>;
}

export function RejectApplication({ row }: DataTableRowActionsProps) {
  const { applicationId, email, programName, name, status } = row.original;
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync: RejectApplication, isPending } =
    api.scholarshipCoordinator.updateStudentApplication.useMutation();

  const handleRejection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "rejected") {
      toast.error("Application already rejected!");
      return;
    }

    const toastId = toast.loading("Rejecting student application...");
    try {
      await RejectApplication({
        applicationId,
        name,
        email,
        programName,
        status: "rejected",
        subject: "Scholarship Application Rejected",
      });
      setOpen(false);
      toast.success("Application rejected successfully!", {
        id: toastId,
        duration: 5000,
      });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <XCircle className="h-4 w-4" />
          <span>Reject</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleRejection} className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              Confirm Rejection
            </AlertDialogTitle>
            <AlertDialogDescription>
              The student will be notified via email that their application was
              not selected. This helps them stay informed about the outcome.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit" disabled={isPending} className="w-32">
                {isPending ? (
                  <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
                ) : (
                  "Reject"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
