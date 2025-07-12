"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <div className="pb-4 text-center">
          <div className="relative mx-auto mb-6">
            <div className="text-primary/50 text-8xl font-bold select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="text-primary h-16 w-16" />
            </div>
          </div>
          <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Page Not Found
          </div>
          <p className="mx-auto max-w-md text-lg text-gray-600 dark:text-gray-400">
            Oops! The page you're looking for seems to have gone on a
            scholarship hunt of its own.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't worry, we've got plenty of other opportunities waiting for
              you!
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="flex items-center gap-2">
                <Link href={PageRoutes.HOME}>
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center border-t pt-6">
            <h3 className="mb-3 text-center font-semibold text-gray-900 dark:text-gray-100">
              Popular Sections
            </h3>
            <div className="flex justify-center">
              <Link
                href={PageRoutes.SCHOLARSHIPS_PUBLIC}
                className="group rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/50 rounded-lg p-2">
                    <BookOpen className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      All Scholarships
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Browse all available programs
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
