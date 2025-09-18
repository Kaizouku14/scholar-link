"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import type { Table } from "@tanstack/react-table";
import { Ban, LoaderCircle, MoreHorizontal, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";
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
import type { ProgramScholars } from "@/interfaces/scholarship/scholars";
import { useState } from "react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import type { scholarshipStatusType } from "@/constants/users/status";
import { Textarea } from "@/components/ui/textarea";

interface DataTableRowActionsProps {
  table: Table<ProgramScholars>;
}

export function ActionsHeader({ table }: DataTableRowActionsProps) {
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedItems = selectedRows.map((row) => ({
    applicationId: row.original.applicationId,
    email: row.original.email,
    name: row.original.name,
    status: row.original.status,
  }));
  const programName = selectedRows[0]!.original.programName;
  const hasInactive = selectedItems.some((s) => s.status === "inactive");
  const [openDeactivate, setOpenDeactivate] = useState<boolean>(false);
  const [openRenew, setOpenRenew] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { mutateAsync: bulkUpdate, isPending } =
    api.scholarshipCoordinator.bulkUpdateApplication.useMutation();
  const { refetch } =
    api.scholarshipCoordinator.getAllScholarsByProgram.useQuery(undefined, {
      enabled: false,
    });

  const handleBulkUpdate = async ({
    status,
  }: {
    status: scholarshipStatusType;
  }) => {
    try {
      let message;
      if (status === "inactive") {
        await bulkUpdate({
          applicationIds: selectedItems.map((s) => s.applicationId),
          emails: selectedItems.map((s) => s.email),
          status,
        });
        message = "All account deactivated successfully!";
        setOpenDeactivate(false);
      } else {
        await bulkUpdate({
          applicationIds: selectedItems.map((s) => s.applicationId),
          emails: selectedItems.map((s) => s.email),
          names: selectedItems.map((s) => s.name),
          status,
          message,
          programName,
        });
        message = "All account renewed successfully!";
        setOpenRenew(false);
      }

      toast.success(message, {
        duration: 5000,
      });
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {selectedItems.length > 0 && (
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted relative flex h-8 w-8 p-0"
            disabled={selectedItems.length === 0 || hasInactive}
          >
            <MoreHorizontal />
            <span className="bg-primary absolute top-1 -right-1 size-auto h-4 w-4 rounded-full text-xs text-white">
              {selectedItems.length}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-fit">
        <AlertDialog open={openDeactivate} onOpenChange={setOpenDeactivate}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-primary flex"
              onSelect={(e) => e.preventDefault()}
            >
              <Ban className="text-primary" />
              Deactivate
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Deactivate Selected Applications?
              </AlertDialogTitle>
              <AlertDialogDescription>
                The selected applications will be deactivated. Students
                associated with these applications will no longer have access to
                the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleBulkUpdate({ status: "inactive" })}
                disabled={isPending}
                className="w-26"
              >
                {isPending ? (
                  <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={openRenew} onOpenChange={setOpenRenew}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex"
              onSelect={(e) => e.preventDefault()}
            >
              <RefreshCcw />
              Renew Document
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Renew Selected Applications?</AlertDialogTitle>
              <AlertDialogDescription>
                The selected applications will be marked for renewal. Students
                associated with these applications will need to resubmit the
                required documents for review.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              placeholder="Enter document to renew"
              className="mt-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleBulkUpdate({ status: "for-renewal" })}
                disabled={isPending}
                className="w-26"
              >
                {isPending ? (
                  <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuSeparator className="data-[state=open]:bg-muted border-border border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
