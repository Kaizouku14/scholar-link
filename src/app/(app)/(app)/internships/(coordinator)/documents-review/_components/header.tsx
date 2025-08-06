import { FilePlus2Icon } from "lucide-react";
import Link from "next/link";

const DocumentsReviewHeader = () => {
  return (
    <div className="bg-primary mt-4 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 md:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage Your Intern's Documents
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            Review and approve student submitted documents.
          </p>
        </div>
        <Link
          href=""
          className="mt-2 flex w-full items-center rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-white/90 md:mt-0 md:w-auto hover:dark:text-black"
        >
          <FilePlus2Icon className="mr-1 h-4 w-4" />
          Add Document
        </Link>
      </div>
    </div>
  );
};

export default DocumentsReviewHeader;
