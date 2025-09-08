import { GraduationCap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageRoutes } from "@/constants/page-routes";

const ScholarshipProgramNotFound = () => {
  return (
    <div className="bg-background flex h-[500px] items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="pb-4 text-center">
          <div className="relative mx-auto mb-6">
            <div className="text-muted-foreground/30 text-6xl font-bold select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap className="text-primary h-12 w-12" />
            </div>
          </div>
          <div className="mb-2 text-2xl font-bold">Scholarship Not Found</div>
          <p className="text-muted-foreground mx-auto max-w-md">
            The scholarship program you&apos;re looking for doesn&apos;t exist
            or may have been removed.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              But don&apos;t give up! There are many other scholarship
              opportunities available.
            </p>

            <Button asChild>
              <Link
                href={PageRoutes.SCHOLARSHIPS_PUBLIC}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Browse All Scholarships
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipProgramNotFound;
