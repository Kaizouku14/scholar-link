import { Skeleton } from "@/components/ui/skeleton";
import Header from "./header";

const Loading = () => {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Header />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-[28.5rem] w-full" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
