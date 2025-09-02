"use client";

import { Button } from "@/components/ui/button";

import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmailActionsProps } from "@/interfaces/email/email";

export default function EmailActions({
  onRefresh,
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
    </div>
  );
}
