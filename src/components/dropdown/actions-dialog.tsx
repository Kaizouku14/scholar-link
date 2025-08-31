"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import type { Table } from "@tanstack/react-table";
import { CircleX, MoreHorizontal, Trash2 } from "lucide-react";
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

interface DataTableRowActionsProps<TData> {
  table: Table<TData>;
}

export function ActionDialog<TData>({
  table,
}: DataTableRowActionsProps<TData>) {
  const selectedItem = table
    .getSelectedRowModel()
    .rows.map((row) => row.original as { internshipId: string });
  const { mutateAsync: cancelInternship, isPending: isCancelPending } =
    api.internshipCoordinator.cancelStudentInternship.useMutation();
  const { mutateAsync: deleteInternship, isPending: isDeletePending } =
    api.internshipCoordinator.deleteStudentInternship.useMutation();

  const ids = selectedItem.map((i) => i.internshipId);
  const handleCancelMutation = async () => {
    const toastId = toast.loading("Canceling all selected internship...");
    try {
      await cancelInternship({ internshipId: ids });
      toast.success("Internships canceled successfully!");
      (table.options.meta as { refetch: () => void }).refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDeleteMutation = async () => {
    const toastId = toast.loading("Deleting all selected internship...");
    try {
      await deleteInternship({ internshipId: ids });
      toast.success("Internships deleted successfully!");
      (table.options.meta as { refetch: () => void }).refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted ml-4 flex h-8 w-8 p-0"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex justify-between"
              onSelect={(e) => e.preventDefault()}
            >
              <span>Cancel</span>
              <CircleX />
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel selected internships?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The selected internships will be
                canceled but not deleted from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction
                disabled={isCancelPending}
                onClick={handleCancelMutation}
              >
                {isCancelPending ? "Canceling..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex justify-between"
              onSelect={(e) => e.preventDefault()}
            >
              <span>Delete</span>
              <Trash2 />
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete selected internships?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent. The selected internships will be
                permanently removed from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction
                disabled={isDeletePending}
                onClick={handleDeleteMutation}
              >
                {isDeletePending ? "Deleting..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
