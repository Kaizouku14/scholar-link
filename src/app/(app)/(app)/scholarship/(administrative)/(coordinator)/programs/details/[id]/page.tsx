import ScholarshipDetails from "./_components/scholarship-details";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="h-auto">
      <ScholarshipDetails id={id} />
    </div>
  );
};

export default Page;
