"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RefreshCw, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SortOrder } from "./mail";

export interface EmailActionsProps {
  onRefresh: () => void;
  onMarkAllAsRead: () => void;
  onSort: (order: SortOrder) => void;
  currentSort: SortOrder;
  unreadCount: number;
  isRefreshing?: boolean;
}

export default function EmailActions({
  onRefresh,
  onMarkAllAsRead,
  onSort,
  currentSort,
  unreadCount,
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
          <DropdownMenuItem
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all read {unreadCount > 0 && `(${unreadCount})`}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onSort("newest")}
            className={currentSort === "newest" ? "bg-accent" : ""}
          >
            Newest first
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onSort("oldest")}
            className={currentSort === "oldest" ? "bg-accent" : ""}
          >
            Oldest first
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
