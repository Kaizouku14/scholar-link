"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { Clock, FileText, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const EditLog = ({
  data,
  refetch,
}: {
  data: {
    id: string;
    hoursLog: number;
    description: string;
  };
  refetch: () => Promise<unknown>;
}) => {
  const { id, hoursLog, description } = data;
  const [newHours, setNewHours] = useState(Math.round(hoursLog));
  const [newDescription, setNewDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: updateLogs } =
    api.internshipStudent.updateStudentLogProgress.useMutation();
  const handleEditLogs = async () => {
    const toastId = toast.loading("Updating log...");
    setIsLoading(true);
    try {
      await updateLogs({
        id,
        hoursLog: newHours,
        description: newDescription,
      });

      await refetch();
      toast.success("Log updated successfully.", { id: toastId });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          <Pencil className="text-muted-foreground h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Log</DialogTitle>
          <DialogDescription>
            Make changes to your logs here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Clock className="h-4 w-4 text-green-500" />
              Time In
            </Label>
            <Input
              id="hours"
              type="number"
              max="12"
              min="1"
              value={newHours}
              onChange={(e) => setNewHours(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <FileText className="h-4 w-4 text-green-500" />
              Description of Activities
            </Label>
            <Textarea
              id="description"
              className="min-h-20"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleEditLogs} disabled={isLoading}>
            {isLoading ? "Updating... " : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
