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
import { InternCard } from "@/components/cards/internship/intern-cards";

interface DataTableRowActionsProps {
  row: Row<InternColumn>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const internsInfo = row.original.interns;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInterns = useMemo(() => {
    return internsInfo?.filter(
      (intern) =>
        intern.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
          placeholder="Search Intern..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ScrollArea className="h-76 max-h-76 space-y-3">
          <div className="space-y-3">
            {filteredInterns?.length ? (
              filteredInterns?.map((intern, index) => (
                <InternCard intern={intern} key={index} />
              ))
            ) : (
              <div className="flex h-76 items-center justify-center py-6">
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
