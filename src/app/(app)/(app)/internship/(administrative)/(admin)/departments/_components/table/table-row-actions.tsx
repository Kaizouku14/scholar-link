"use client";

import type { Row } from "@tanstack/react-table";
import { Eye, GraduationCap, Mail, Search, UserCheck } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { ROLE } from "@/constants/users/roles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternCard } from "@/components/cards/internship/intern-cards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatText } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INTERNSHIP_STATUS,
  type internshipStatusType,
} from "@/constants/users/status";
import type { Deparments } from "@/interfaces/internship/department";

interface DataTableRowActionsProps {
  row: Row<Deparments>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const users = row.original.users;

  const coordinators =
    users?.filter((user) => user.role === ROLE.INTERNSHIP_COORDINATOR) || [];
  const interns = useMemo(() => {
    return users?.filter((user) => user.role === ROLE.INTERNSHIP_STUDENT) || [];
  }, [users]);

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<internshipStatusType | undefined>();

  const filteredInterns = useMemo(() => {
    let result = interns;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (intern) =>
          intern.name?.toLowerCase().includes(searchLower) ||
          intern.email?.toLowerCase().includes(searchLower) ||
          intern.course?.toLowerCase().includes(searchLower),
      );
    }

    if (status) {
      result = result.filter((intern) => intern.status === status);
    }

    return result;
  }, [interns, searchTerm, status]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm">View</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader className="mb-0 pb-0">
          <DialogTitle> Internship Deparment Details</DialogTitle>
          <DialogDescription>
            List of interns & coordinator in this deparment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex">
            <div className="relative mx-1 h-9 w-full">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search interns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full pt-1 pl-10"
              />
            </div>
            <Select
              onValueChange={(value) =>
                setStatus(value as internshipStatusType)
              }
              defaultValue={status}
            >
              <SelectTrigger className="h-12">
                <SelectValue
                  placeholder="Select status"
                  className="flex h-12 items-center"
                />
              </SelectTrigger>
              <SelectContent>
                {INTERNSHIP_STATUS.map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatText(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs
            defaultValue="interns"
            className="mt-0 flex h-90 flex-1 flex-col pt-0"
          >
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
              <ScrollArea className="h-80 px-1">
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
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage
                            src={coordinator.profile ?? undefined}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {coordinator.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-foreground truncate font-semibold">
                              {formatText(coordinator.name)}
                            </h3>
                            <span className="text-primary bg-primary/10 rounded-full px-2 py-0.5 text-xs font-medium">
                              Coordinator
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="text-muted-foreground h-3.5 w-3.5" />
                            <a
                              href={`mailto:${coordinator.email}`}
                              className="text-muted-foreground hover:text-primary truncate text-xs hover:underline"
                            >
                              {coordinator.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-xs font-medium">
                              Assigned Section:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {coordinator.section ? (
                                (() => {
                                  try {
                                    const sections = JSON.parse(
                                      coordinator.section.toString(),
                                    ) as string[];
                                    return sections.map((section, idx) => (
                                      <span
                                        key={idx}
                                        className="bg-secondary rounded px-1.5 py-0.5 text-xs"
                                      >
                                        {section}
                                      </span>
                                    ));
                                  } catch {
                                    return (
                                      <span className="text-muted-foreground text-xs">
                                        No sections
                                      </span>
                                    );
                                  }
                                })()
                              ) : (
                                <span className="text-muted-foreground text-xs">
                                  No sections
                                </span>
                              )}
                            </div>
                          </div>
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
