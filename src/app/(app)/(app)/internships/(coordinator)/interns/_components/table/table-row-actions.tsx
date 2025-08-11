"use client";

import type { Row } from "@tanstack/react-table";
import { Ban, BookOpenCheck, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const handleProcessedTransaction = () => {};

  return (
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
          <span>Processed</span>
          <BookOpenCheck />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          <span>Canceled</span>
          <Ban />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
