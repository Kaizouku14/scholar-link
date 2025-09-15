"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { api } from "@/trpc/react";
import type { Accounts } from "@/interfaces/internship/accounts";

interface DataTableRowActionsProps {
  row: Row<Accounts>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { email, status } = row.original;

  const { mutateAsync: revokedEmail } =
    api.auth.revokeAuthorizedEmail.useMutation();
  const { refetch } = api.auth.getAllInternshipAccounts.useQuery(undefined, {
    enabled: false,
  });

  const handleRevokeEmail = async () => {
    if (!email?.trim()) return;

    setIsLoading(true);
    const toastId = toast.loading("Revoking email...");
    try {
      await revokedEmail({ email });
      toast.success("Email revoked successfully", { id: toastId });
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

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
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuItem
          className="text-primary hover:text-primary flex"
          onClick={handleRevokeEmail}
          disabled={isLoading || status === "revoked"}
        >
          <XCircle className="text-primary" />
          <span>Revoke</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
