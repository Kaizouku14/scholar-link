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

interface DataTableRowActionsProps {
  row: Row<Applications>;
}

export function RejectApplication({ row }: DataTableRowActionsProps) {
  const { applicationId, email } = row.original;
  const [open, setOpen] = useState<boolean>(false);

  const handleRejection = async () => {
    console.log(applicationId, email);
    setOpen(false);
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
            <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this application. Your
              message will be sent directly to the student&apos;s email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                type="submit"
                //    disabled={isPending}
                className="w-32"
              >
                {false ? (
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
