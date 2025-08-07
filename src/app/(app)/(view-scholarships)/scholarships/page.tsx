import type { Metadata } from "next";
import AvailableScholarships from "./_components/scholarships";

export const metadata: Metadata = {
  title: "Scholarships",
};

const Page = () => {
  return <AvailableScholarships />;
};

export default Page;
