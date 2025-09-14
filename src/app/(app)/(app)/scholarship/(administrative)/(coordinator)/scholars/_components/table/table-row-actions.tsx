"use client";

import type { Row } from "@tanstack/react-table";
import {
  Ban,
  CheckCircle,
  ClipboardList,
  Eye,
  FileText,
  User,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import React from "react";
import type { ProgramScholars } from "@/interfaces/scholarship/scholars";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

export function DataTableRowActions({ row }: { row: Row<ProgramScholars> }) {
  const { documents, status, email, applicationId } = row.original;
  const activate = status === "active";
  const { mutateAsync: updateApplicationStatus, isPending } =
    api.scholarshipCoordinator.updateScholarStatus.useMutation();
  const { refetch } =
    api.scholarshipCoordinator.getAllScholarsByProgram.useQuery(undefined, {
      enabled: false,
    });

  const handleActions = async () => {
    const toastId = toast.loading("Updating scholar status...");
    try {
      if (activate) {
        await updateApplicationStatus({
          applicationId,
          email,
          status: "inactive",
        });
        toast.success("Scholar deactivated successfully!", {
          id: toastId,
          duration: 5000,
        });
      } else {
        await updateApplicationStatus({
          applicationId,
          email,
          status: "active",
        });
        toast.success("Scholar activated successfully!", {
          id: toastId,
          duration: 5000,
        });
      }

      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm">View Details</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Scholar Information</DialogTitle>
            <DialogDescription>
              Complete profile and document status for this scholar
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="information" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="documents">
                Documents ({documents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="information" className="space-y-6">
              <ScrollArea className="h-70 p-2.5">
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 p-2">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <User className="text-muted-foreground h-5 w-5" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-muted-foreground text-sm font-medium">
                          Applicant
                        </label>
                        <p className="mt-1 text-sm font-medium">
                          {row.original.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-muted-foreground text-sm font-medium">
                          Email
                        </label>
                        <p className="mt-1 text-sm">{row.original.email}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground text-sm font-medium">
                          Contact
                        </label>
                        <p className="mt-1 text-sm">{row.original.contact}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground text-sm font-medium">
                          Address
                        </label>
                        <p className="mt-1 text-sm">{row.original.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-2">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <ClipboardList className="text-muted-foreground h-5 w-5" />
                      Application Status
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-muted-foreground text-sm font-medium">
                          Date Applied
                        </label>
                        <p className="mt-1 text-sm">
                          {format(row.original.appliedAt, "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div>
                        <label className="text-muted-foreground text-sm font-medium">
                          Date {activate ? "Approved" : "Deactivated"}
                        </label>
                        <p className="mt-1 text-sm">
                          {format(row.original.updatedAt, "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="documents" className="space-y-2">
              <ScrollArea className="h-70 p-2.5">
                {documents.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>No documents uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="hover:bg-muted/50 border-border flex items-center justify-between rounded-lg border p-4 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium">{doc.label}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(doc.url ?? undefined, "_blank")
                              }
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <DialogFooter className="w-full">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        className={cn(
          "flex cursor-pointer items-center gap-2",
          !activate && "bg-green-700 hover:bg-green-600",
        )}
        onClick={handleActions}
        disabled={isPending}
      >
        {activate ? (
          <>
            <Ban className="h-4 w-4" />
            Deactivate
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4" />
            Activate
          </>
        )}
      </Button>
    </div>
  );
}
