import DocumentListTable from "./_components/table/table";
import DocumentListHeader from "./_components/header";

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <DocumentListHeader />
      <DocumentListTable />
    </div>
  );
};

export default Page;
