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
import React from "react";
import type { ProgramScholars } from "@/interfaces/scholarship/scholars";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DataTableRowActions({ row }: { row: Row<ProgramScholars> }) {
  const documents = row.original.documents;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm">View Details</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            View Scholar Information
          </DialogTitle>
          <DialogDescription>
            Submitted and pending documents for this intern
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="information" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="documents">
            {documents.map((doc) => (
              <div key={doc.id}>{doc.label}</div>
            ))}
          </TabsContent>
        </Tabs>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
