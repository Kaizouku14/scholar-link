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

        <div className="flex w-full flex-col items-center gap-4">
          {/* Heading */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="h-6 w-56" /> {/* Title */}
            <Skeleton className="h-4 w-72" /> {/* Subtitle */}
          </div>

          <div className="grid w-full max-w-md items-center gap-x-4 gap-y-2">
            {/* Name, Middle, Surname */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" /> {/* Label */}
                <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>

            {/* Course */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Department + Section */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Button + Link */}
            <div className="mt-2 flex flex-col gap-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <Skeleton className="absolute inset-0 size-full" />
      </div>
    </div>
  );
}
