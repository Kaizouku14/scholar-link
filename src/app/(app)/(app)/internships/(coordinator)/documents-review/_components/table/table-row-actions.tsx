"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Row, Table } from "@tanstack/react-table";
import { CheckCircle, CircleX, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleDelete = async () => {};

  const handleEdit = async (data: any) => {};

  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        className="cursor-pointer text-green-600 hover:text-green-700"
      >
        <CheckCircle />
        Approved
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="flex justify-between">
            <span>Rejected</span>
            <CircleX />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between">
            <span>Delete</span>
            <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
