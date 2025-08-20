"use client";

import type { Row } from "@tanstack/react-table";
import { Eye, GraduationCap, Search, UserCheck } from "lucide-react";
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
import type { DepartmentColumn } from "./column-schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ROLE } from "@/constants/users/roles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternCard } from "@/components/cards/internship/intern-cards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DataTableRowActionsProps {
  row: Row<DepartmentColumn>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const users = row.original.users;

  const coordinators =
    users?.filter((user) => user.role === ROLE.INTERNSHIP_COORDINATOR) || [];
  const interns =
    users?.filter((user) => user.role === ROLE.INTERNSHIP_STUDENT) || [];

  // Search state for interns
  const [searchTerm, setSearchTerm] = useState("");

  // Filter interns based on search term
  const filteredInterns = interns.filter((intern) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      intern.name?.toLowerCase().includes(searchLower) ??
      intern.surname?.toLowerCase().includes(searchLower) ??
      intern.email?.toLowerCase().includes(searchLower) ??
      intern.studentNo?.toLowerCase().includes(searchLower) ??
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
          <DialogTitle> Internship Deparment Details</DialogTitle>
          <DialogDescription>
            List of interns & coordinator in this deparment.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="interns" className="flex h-90 flex-1 flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="interns" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Interns ({interns.length})
            </TabsTrigger>
            <TabsTrigger
              value="coordinators"
              className="flex items-center gap-2"
            >
              <UserCheck className="h-4 w-4" />
              Coordinators ({coordinators.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interns" className="flex flex-1 flex-col">
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
                  <p className="text-muted-foreground text-sm">
                    No interns found.
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent
            value="coordinators"
            className="mt-4 flex flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              {coordinators.length > 0 ? (
                <div className="border-border space-y-3 rounded-xl border p-2">
                  {coordinators.map((coordinator, index) => (
                    <div
                      key={index}
                      className="hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-3 shadow-sm transition-colors"
                    >
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage
                          src={coordinator.profile ?? undefined}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm font-medium">
                          {coordinator.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col overflow-hidden">
                        <h3 className="text-card-foreground truncate text-sm font-semibold">
                          {coordinator.surname}, {coordinator.name}{" "}
                          {coordinator.middleName &&
                            `${coordinator.middleName}`}
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          {coordinator.email}
                        </p>
                        <p className="text-primary mt-0.5 text-xs font-medium">
                          Internship Coordinator
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-76 items-center justify-center py-6">
                  <p className="text-muted-foreground text-sm">
                    No coordinators found.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
