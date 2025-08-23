import { PageRoutes } from "@/constants/page-routes";
import { ROLE } from "@/constants/users/roles";
import { auth } from "@/lib/auth";
import { Building } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const InternshipHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isCoordinator = session?.user.role === ROLE.INTERNSHIP_COORDINATOR;
  return (
    <div className="bg-primary rounded-lg p-6 shadow-md">
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage Internships.
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            Manage All the intern&apos;s in your department.
          </p>
        </div>

        {isCoordinator && (
          <Link
            href={PageRoutes.INTERNSHIP_INTERNS_CREATE}
            className="mt-2 flex w-auto items-center rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-white/90 md:mt-0 hover:dark:text-black"
          >
            <Building className="mr-1.5 h-4 w-4" />
            Add Internship
          </Link>
        )}
      </div>
    </div>
  );
};

export default InternshipHeader;
