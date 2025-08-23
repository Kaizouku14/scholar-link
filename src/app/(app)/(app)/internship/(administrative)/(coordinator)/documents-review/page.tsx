import type { Metadata } from "next";
import ReviewDocumentsTable from "./_components/table/table";

export const metadata: Metadata = {
  title: "Document Review",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto px-2">
      <ReviewDocumentsTable />
    </div>
  );
};

export default Pages;
