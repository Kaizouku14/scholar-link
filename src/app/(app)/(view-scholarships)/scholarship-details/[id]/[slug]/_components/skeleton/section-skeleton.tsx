import { Skeleton } from "@/components/ui/skeleton";

const SectionSkeleton = () => {
  return (
    <div className="container mx-auto">
      <div className="space-y-6 py-6 md:py-8">
        <div defaultValue="about" className="w-full">
          <div className="mb-4 grid w-full grid-cols-5 gap-2">
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
          </div>
        </div>
        <Skeleton className="h-96 rounded" />
      </div>
    </div>
  );
};

export default SectionSkeleton;
