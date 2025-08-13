import { PageRoutes } from "@/constants/page-routes";
import { Building } from "lucide-react";
import Link from "next/link";

const ManageProgressHeader = () => {
  return (
    <div className="bg-primary mt-4 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2">
        <div className="space-y-1.5">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage Internship Progress.
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            Stay updated on your progress throughout your internship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageProgressHeader;
