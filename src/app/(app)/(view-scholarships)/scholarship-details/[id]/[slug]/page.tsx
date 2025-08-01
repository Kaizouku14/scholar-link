import Section from "@/components/scholarship-details/scholarship-section";
import type { Metadata } from "next";

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
      <Section id={id} />
    </div>
  );
};

export default ScholarshipDetailsPage;
