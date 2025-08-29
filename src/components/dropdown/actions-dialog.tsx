"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { CircleX, MoreHorizontal, Trash2 } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  table: Table<TData>;
}

export function ActionDialog<TData>({
  table,
}: DataTableRowActionsProps<TData>) {
  console.log(table);

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
        <DropdownMenuItem className="flex justify-between">
          <span>Cancel</span>
          <CircleX />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          <span>Delete</span>
          <Trash2 />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
