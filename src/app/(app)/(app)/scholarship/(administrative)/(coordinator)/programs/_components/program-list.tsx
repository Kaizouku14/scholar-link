"use client";

import { Input } from "@/components/ui/input";
import ProgramType from "./program-type";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgramCardProps from "../_components/card/scholarship-card";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProgramList = () => {
  const { data, isLoading, refetch } =
    api.scholarships.getAllPrograms.useQuery();
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((program) => {
      const nameMatch =
        !filterSearch.trim() ||
        program.name?.toLowerCase().includes(filterSearch.toLowerCase());
      const typeMatch = !selectedType || program.type === selectedType;

      return nameMatch && typeMatch;
    });
  }, [data, filterSearch, selectedType]);

  return (
    <div className="space-y-4">
      <div className="border-border flex items-center justify-between gap-x-4 rounded-lg border p-4">
        <Input
          placeholder="Search scholarship program..."
          className="h-10 w-1/2"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
        />
        <ProgramType
          selectedType={selectedType}
          onTypeChange={setSelectedType}
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
                <ProgramCardProps
                  key={program.programId}
                  data={program}
                  refetch={refetch}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
};

export default ProgramList;
