import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <section className="border-b bg-gradient-to-r from-gray-500/10 to-gray-500/5 px-12 py-8 md:p-12">
      <div className="container">
        <div className="animate-pulse space-y-4">
          <Skeleton className="h-8 w-1/3 rounded dark:bg-gray-200" />
          <Skeleton className="h-12 w-2/3 rounded dark:bg-gray-200" />
          <Skeleton className="h-4 w-full rounded dark:bg-gray-200" />
        </div>
      </div>
    </section>
  );
};

export default HeaderSkeleton;
