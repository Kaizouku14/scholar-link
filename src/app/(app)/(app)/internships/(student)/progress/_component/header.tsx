import { PageRoutes } from "@/constants/page-routes";
import { Clock, ShieldPlus } from "lucide-react";
import Link from "next/link";

const ManageProgressHeader = () => {
  return (
    <div className="bg-primary mt-4 rounded-lg p-6 shadow-md">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Manage Internship Progress.
          </h1>
          <p className="text-sm font-medium text-white/90 md:text-base">
            Stay updated on your progress throughout your internship.
          </p>
        </div>
        <Link
          href={"#"}
          className="mt-2 flex w-full items-center rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-white/90 md:mt-0 md:w-auto hover:dark:text-black"
        >
          <Clock className="mr-2 h-4 w-4" />
          Log Hours
        </Link>
      </div>
    </div>
  );
};

export default ManageProgressHeader;
