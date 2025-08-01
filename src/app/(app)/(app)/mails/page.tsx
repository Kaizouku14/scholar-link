import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import Mail from "./_components/mail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mails",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Mails" />
      <Mail />
    </div>
  );
};

export default Pages;
