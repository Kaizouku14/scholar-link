import ProgressOverview from "./_component/progress-overview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress",
};
const Pages = () => {
  return (
    <div className="mx-auto space-y-4 md:px-2">
      <ProgressOverview />
    </div>
  );
};

export default Pages;
