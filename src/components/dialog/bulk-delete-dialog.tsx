import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Table } from "@tanstack/react-table";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

const BulkDeleteDialog = <TData,>({
  table,
  deleteMutation,
}: {
  table: Table<TData>;
  deleteMutation?: UseMutateAsyncFunction<any, any, any, any>;
}) => {
  const HandleBulkDelete = () => {
    const selectedItems = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    const selectedIds = selectedItems.map(
      (item) => (item as { id: string }).id,
    );

    toast.promise(deleteMutation!(selectedIds), {
      loading: "Deleting selected items...",
      success: () => {
        table.resetRowSelection();
        return "Selected items deleted successfully!";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 cursor-pointer p-1"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="text-destructive h-5 w-5" />
            Delete Selected Items
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected items? This action
            cannot be undone and will permanently remove all selected data.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-destructive/10 flex items-center gap-2 rounded-lg p-3">
            <AlertTriangle className="text-primary h-4 w-4 flex-shrink-0" />
            <span className="text-primary text-sm">
              This will permanently delete all selected items and cannot be
              reversed.
            </span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="default" onClick={HandleBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDeleteDialog;
