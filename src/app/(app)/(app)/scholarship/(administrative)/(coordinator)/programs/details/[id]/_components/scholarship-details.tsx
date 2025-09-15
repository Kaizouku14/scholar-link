"use client";

import HeaderSkeleton from "@/components/skeleton/header-skeleton";
import SectionSkeleton from "@/components/skeleton/section-skeleton";
import { api } from "@/trpc/react";
import ProgramDetailsHeader from "./header";
import { useState } from "react";
import TipTapEditor from "@/components/titap/editor";
import type { JSONContent } from "@tiptap/react";

const ScholarshipDetails = ({ id }: { id: string }) => {
  const { data, isLoading } =
    api.scholarships.getScholarshipProgramById.useQuery({ id });
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div className="w-full">
      {!isLoading && data?.program ? (
        <div>
          <ProgramDetailsHeader
            data={data.program}
            onEdit={onEdit}
            setOnEdit={setOnEdit}
          />
          <div className="container mx-auto">
            <div className="space-y-6 p-2.5">
              <TipTapEditor
                value={JSON.parse(data.program.section) as JSONContent}
                onChange={(content) => console.log(content)}
                editable={onEdit}
                className="max-h-[40rem] overflow-auto border-none"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <HeaderSkeleton />
          <SectionSkeleton />
        </>
      )}
    </div>
  );
};

export default ScholarshipDetails;
