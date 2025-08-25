"use client";

import type { Row } from "@tanstack/react-table";
import { Eye, Search } from "lucide-react";
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
import type { CompanySchema } from "./column-schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InternCard } from "@/components/cards/internship/intern-cards";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface DataTableRowActionsProps {
  row: Row<CompanySchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const internsInfo = row.original.interns;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInterns = internsInfo.filter((intern) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      intern.name?.toLowerCase().includes(searchLower) ??
      intern.email?.toLowerCase().includes(searchLower) ??
      intern.course?.toLowerCase().includes(searchLower)
    );
  });
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
        <div className="relative mx-1 mb-2">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search interns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <ScrollArea className="h-70 px-1">
          {filteredInterns.length > 0 ? (
            <div className="space-y-3 pr-2">
              {filteredInterns.map((intern, index) => (
                <InternCard intern={intern} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex h-76 items-center justify-center py-6">
              <p className="text-muted-foreground text-sm">No interns found.</p>
            </div>
          )}
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
