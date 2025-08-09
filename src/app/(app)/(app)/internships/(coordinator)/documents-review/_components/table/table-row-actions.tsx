"use client";

import { Button } from "@/components/ui/button";
import type { Row, Table } from "@tanstack/react-table";
import { CheckCircle, XCircle } from "lucide-react";
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
      <Button
        variant={"outline"}
        className="text-primary hover:text-primary/80 cursor-pointer"
      >
        <XCircle />
        Rejected
      </Button>
    </div>
  );
}
