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
import type { AdminSectionData } from "@/interfaces/internship/hei";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InternCard } from "@/components/cards/internship/intern-cards";

interface DataTableRowActionsProps {
  row: Row<AdminSectionData>;
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

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-0 pb-0">
          <DialogTitle>Internship Details</DialogTitle>
          <DialogDescription>
            List of interns in this company.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative mx-1 h-10">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search interns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-10"
            />
          </div>
          <ScrollArea className="h-90 px-1">
            {filteredInterns.length > 0 ? (
              <div className="space-y-3 pr-2">
                {filteredInterns.map((intern, index) => (
                  <InternCard
                    intern={{
                      name: intern.name,
                      email: intern.email,
                      profile: intern.profile,
                      status: intern.status,
                    }}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-76 items-center justify-center py-6">
                <p className="text-muted-foreground text-sm">
                  No interns found.
                </p>
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
