import type { Metadata } from "next";
import ProgramSection from "./_components/scholarship-section";

export const metadata: Metadata = {
  title: "Scholarship Details",
};

const ScholarshipDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="h-auto">
      <ProgramSection id={id} />
    </div>
  );
};

export default ScholarshipDetailsPage;
