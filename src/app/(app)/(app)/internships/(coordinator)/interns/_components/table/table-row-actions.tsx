"use client";

import type { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
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
import type { InternColumn } from "./column-schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

interface DataTableRowActionsProps {
  row: Row<InternColumn>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const internsInfo = row.original.interns;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInterns = useMemo(() => {
    return internsInfo?.filter((intern) =>
      intern.surname?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [internsInfo, searchTerm]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm">View</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[80vh] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Internship Details</DialogTitle>
          <DialogDescription>
            List of interns in this company.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="text"
          placeholder="Search by surname"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ScrollArea className="h-76 max-h-76 space-y-3">
          <div className="space-y-3">
            {internsInfo?.length ? (
              filteredInterns?.map((intern, index) => (
                <div
                  key={index}
                  className="border-border hover:bg-muted/50 rounded-md border p-3 transition-colors"
                >
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-card-foreground text-sm font-medium">
                          {intern.name} {intern.middleName} {intern.surname}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            intern.status === "in-progress"
                              ? "bg-green-100 text-green-700"
                              : intern.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {intern.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {intern.email}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div>
                        <span className="text-card-foreground font-medium">
                          Course:
                        </span>
                        <p className="text-muted-foreground">{intern.course}</p>
                      </div>
                      <div>
                        <span className="text-card-foreground font-medium">
                          Year:
                        </span>
                        <p className="text-muted-foreground">
                          {intern.yearLevel}
                        </p>
                      </div>
                      <div>
                        <span className="text-card-foreground font-medium">
                          Section:
                        </span>
                        <p className="text-muted-foreground">
                          {intern.section}
                        </p>
                      </div>
                      <div>
                        <span className="text-card-foreground font-medium">
                          Student No:
                        </span>
                        <p className="text-muted-foreground">
                          {intern.studentNo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-muted-foreground text-sm">
                  No interns found.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
