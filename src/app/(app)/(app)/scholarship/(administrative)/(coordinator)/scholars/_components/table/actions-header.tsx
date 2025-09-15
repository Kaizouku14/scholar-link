import type { Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
  table: Table<TData>;
}

export function ActionsHeader<TData>({
  table,
}: DataTableRowActionsProps<TData>) {
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className={cn("flex items-center")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="-ml-3" size="icon">
            <div className="relative">
              <Ellipsis className="h-4 w-4" />
              <span className="bg-primary absolute -top-1.5 -right-3 size-auto h-4 w-4 rounded-full text-xs text-white">
                {selectedRows.length}5
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <ArrowUp className="text-muted-foreground/70 h-3.5 w-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowDown className="text-muted-foreground/70 h-3.5 w-3.5" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
