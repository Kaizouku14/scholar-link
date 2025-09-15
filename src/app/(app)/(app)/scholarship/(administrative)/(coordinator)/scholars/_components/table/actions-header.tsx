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
import { Ban, LoaderCircle, MoreHorizontal } from "lucide-react";
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

interface DataTableRowActionsProps {
  table: Table<ProgramScholars>;
}

export function ActionsHeader({ table }: DataTableRowActionsProps) {
  const selectedItems = table.getSelectedRowModel().rows.map((row) => ({
    applicationId: row.original.applicationId,
    email: row.original.email,
  }));

  const { mutateAsync: bulkDeactivation, isPending } =
    api.scholarshipCoordinator.bulkAccountDeactivation.useMutation();
  const { refetch } =
    api.scholarshipCoordinator.getAllScholarsByProgram.useQuery(undefined, {
      enabled: false,
    });

  const handleBulkDeactivation = async () => {
    try {
      await bulkDeactivation({
        applicationIds: selectedItems.map((s) => s.applicationId),
        emails: selectedItems.map((s) => s.email),
      });

      await refetch();
      toast.success("All account deactivated successfully!", {
        duration: 5000,
      });
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
            disabled={selectedItems.length === 0}
          >
            <MoreHorizontal />
            <span className="bg-primary absolute top-1 -right-1 size-auto h-4 w-4 rounded-full text-xs text-white">
              {selectedItems.length}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-fit">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex"
              onSelect={(e) => e.preventDefault()}
            >
              <Ban />
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
                onClick={handleBulkDeactivation}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
