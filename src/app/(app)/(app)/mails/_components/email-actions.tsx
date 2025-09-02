"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RefreshCw, MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmailActionsProps } from "@/interfaces/email/email";

export default function EmailActions({
  onRefresh,
  onSort,
  currentSort,
  isRefreshing = false,
}: EmailActionsProps) {
  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw
          className={cn(
            "h-4 w-4 transition-transform duration-500",
            isRefreshing && "animate-spin",
          )}
        />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
            Sort by
          </div>
          <DropdownMenuItem
            onClick={() => onSort("newest")}
            className={`${currentSort === "newest" ? "bg-accent" : ""} text-foreground flex gap-1`}
          >
            <span>Date</span>
            <ArrowDown className="text-foreground h-4 w-4" />
            <span>(Newest first)</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onSort("oldest")}
            className={`${currentSort === "oldest" ? "bg-accent" : ""} text-foreground flex gap-1`}
          >
            <span>Date</span>
            <ArrowUp className="text-foreground h-4 w-4" />
            <span>(Oldest first)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
