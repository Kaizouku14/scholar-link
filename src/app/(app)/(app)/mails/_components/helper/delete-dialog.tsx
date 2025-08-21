"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useState } from "react";
import type { Email } from "@/types/email";

export const DeleteMail = ({
  ids,
  refetch,
  setSelectedThread,
}: {
  ids?: string[];
  refetch: () => Promise<unknown>;
  setSelectedThread: (thread: Email[]) => void;
}) => {
  const { mutateAsync: deleteMail } = api.mail.deleteMail.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMail({ ids: ids! });
      await refetch();
      setSelectedThread([]);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="text-muted-foreground h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary flex items-center">
            <TriangleAlert className="mr-2 h-5 w-5" />
            <span>Are you sure?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the mail.
          </AlertDialogDescription>
          {ids}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary flex items-center"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <TriangleAlert className="h-4 w-4" />
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
