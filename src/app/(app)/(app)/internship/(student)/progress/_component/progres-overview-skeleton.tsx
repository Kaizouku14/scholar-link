import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProgressOverviewSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="mt-4 ml-1 flex flex-col gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-6 w-50" />
        </div>

        <div className="border-border rounded-2xl border p-6">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-3 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="group border-border border">
            <CardContent className="flex items-center gap-2.5 p-4">
              <Skeleton className="h-12 w-26 rounded-xl" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
