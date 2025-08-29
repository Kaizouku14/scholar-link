"use client";

import type { Row } from "@tanstack/react-table";
import { CircleX, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { CoordinatorSectionData } from "@/interfaces/internship/hei";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

interface DataTableRowActionsProps {
  row: Row<CoordinatorSectionData>;
  disabled: boolean;
}

export function DataTableRowActions({
  row,
  disabled,
}: DataTableRowActionsProps) {
  const { mutateAsync: cancelInternship, isPending: isCancelPending } =
    api.internshipCoordinator.cancelStudentInternship.useMutation();
  const { mutateAsync: deleteInternship, isPending: isDeletePending } =
    api.internshipCoordinator.deleteStudentInternship.useMutation();
  const { refetch } = api.internshipCoordinator.getAllInternships.useQuery(
    undefined,
    {
      enabled: false,
    },
  );

  const handleCancelInternship = async () => {
    const internshipId = row.original.internshipId;
    await cancelInternship({ internshipId: [internshipId] });

    toast.success("Internship canceled successfully!");
    await refetch();
  };

  const handleDeleteInternship = async () => {
    const internshipId = row.original.internshipId;
    await deleteInternship({ internshipId: [internshipId] });

    toast.success("Internship deleted successfully!");
    await refetch();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          disabled={disabled}
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="flex justify-between"
          disabled={isCancelPending}
          onClick={handleCancelInternship}
        >
          <span>Cancel</span>
          <CircleX />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          disabled={isDeletePending}
          onClick={handleDeleteInternship}
        >
          <span>Delete</span>
          <Trash2 />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
