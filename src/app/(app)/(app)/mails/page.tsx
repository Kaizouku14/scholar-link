import Mail from "./_components/mail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mails",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 md:px-2">
      <Mail />
    </div>
  );
};

export default Pages;
