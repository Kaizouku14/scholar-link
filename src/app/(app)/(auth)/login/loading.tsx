import { Skeleton } from "@/components/ui/skeleton";
import { PageRoutes } from "@/constants/page-routes";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href={PageRoutes.HOME}
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <GraduationCap className="size-5" />
            </div>
            <div className="flex text-xl font-bold">
              <span>Scholar</span>
              <span className="text-primary">Link</span>
            </div>
          </Link>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-6 w-70" />
            <Skeleton className="h-4 w-80" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-80" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-80" />
            <div className="flex w-80 justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="mt-1 flex flex-col items-center gap-1">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-3 w-60" />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <Skeleton className="absolute inset-0 size-full" />
      </div>
    </div>
  );
}
