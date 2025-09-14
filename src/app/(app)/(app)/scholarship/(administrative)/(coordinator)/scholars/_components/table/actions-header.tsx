import type { Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
  table: Table<TData>;
  title: string;
}

export function ActionsHeader<TData>({
  table,
  title,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className={cn("flex items-center")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="-ml-3 h-8">
            <span>{title}</span>
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
