const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>Program Details {id}</div>;
};

export default Page;
