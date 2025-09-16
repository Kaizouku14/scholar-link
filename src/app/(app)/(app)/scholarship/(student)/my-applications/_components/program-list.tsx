"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import ScholarsProgramCard from "./cards/program-card";

const ScholarProgramList = () => {
  const { data, isLoading } =
    api.scholarshipStudent.fetchAllApplications.useQuery();
  const [filterSearch, setFilterSearch] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((program) => {
      const nameMatch =
        !filterSearch.trim() ||
        program.programName?.toLowerCase().includes(filterSearch.toLowerCase());

      return nameMatch;
    });
  }, [data, filterSearch]);

  return (
    <div className="space-y-4">
      <div className="border-border flex items-center justify-between gap-x-4 rounded-lg border p-4">
        <Input
          placeholder="Search scholarship program..."
          className="h-10 w-1/2"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <Skeleton className="h-96" />
      ) : (
        <ScrollArea className="border-border h-[500px] rounded-lg border p-4">
          {filteredData?.length === 0 ? (
            <div className="flex h-[460px] items-center justify-center">
              <div className="text-muted-foreground">
                No scholarship programs found.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredData?.map((program) => (
                <ScholarsProgramCard
                  key={program.applicationId}
                  data={program}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
};

export default ScholarProgramList;
