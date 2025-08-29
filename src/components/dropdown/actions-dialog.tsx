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
        <DropdownMenuItem
          className="flex justify-between"
          disabled={isCancelPending || isDeletePending}
          onClick={handleCancelMutation}
        >
          <span>Cancel</span>
          <CircleX />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          disabled={isCancelPending || isDeletePending}
          onClick={handleDeleteMutation}
        >
          <span>Delete</span>
          <Trash2 />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
