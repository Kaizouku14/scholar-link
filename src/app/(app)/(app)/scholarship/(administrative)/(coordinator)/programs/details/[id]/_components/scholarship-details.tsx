"use client";

import HeaderSkeleton from "@/components/skeleton/header-skeleton";
import SectionSkeleton from "@/components/skeleton/section-skeleton";
import { api } from "@/trpc/react";
import ProgramDetailsHeader from "./header";
import { useState } from "react";
import TipTapEditor from "@/components/titap/editor";
import type { JSONContent } from "@tiptap/react";
import toast from "react-hot-toast";

const ScholarshipDetails = ({ id }: { id: string }) => {
  const { data, isLoading, refetch } =
    api.public.getScholarshipProgramById.useQuery({ id });
  const { mutateAsync: updateProgramSection, isPending } =
    api.scholarshipCoordinator.onUpdateOverview.useMutation();
  const [onEdit, setOnEdit] = useState(false);
  const [newContent, setNewContent] = useState("");

  const handleOnEdit = async () => {
    try {
      if (onEdit) {
        await updateProgramSection({ programId: id, overview: newContent });
        await refetch();
        toast.success("Program updated successfully!");
      }
      setOnEdit(!onEdit);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="w-full">
      {!isLoading && data?.program ? (
        <div>
          <ProgramDetailsHeader
            data={data.program}
            onEdit={onEdit}
            handleToggleEdit={handleOnEdit}
            isPending={isPending}
          />
          <div className="container mx-auto">
            <div className="space-y-6 p-2.5">
              <TipTapEditor
                value={JSON.parse(data.program.section) as JSONContent}
                onChange={(content) => setNewContent(content)}
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
