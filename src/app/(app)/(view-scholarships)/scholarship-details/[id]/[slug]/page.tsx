import Section from "@/components/scholarship-details/scholarship-section";

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
