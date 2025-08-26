import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import SetupPage from "./_components/setup";

export const metadata = {
  title: "Setup",
};

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <InteractiveGridPattern
        width={90}
        height={80}
        squaresClassName="hover:fill-primary"
        className={cn(
          "z-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      <SetupPage />
    </div>
  );
};

export default Page;
