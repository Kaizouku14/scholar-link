import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="from-background via-background/95 to-accent/20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-1/2 -left-1/2 h-full w-full animate-pulse rounded-full blur-3xl"></div>
        <div className="bg-accent/10 absolute -right-1/2 -bottom-1/2 h-full w-full animate-pulse rounded-full blur-3xl delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-xl"></div>
          <Loader className="text-primary relative size-12 animate-spin drop-shadow-lg" />
        </div>

        <div className="relative flex items-center gap-1">
          <div className="from-primary/20 to-accent/20 absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r blur-2xl"></div>
          <span className="from-foreground to-foreground/80 relative animate-bounce bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            Scholar
          </span>
          <span className="from-primary to-primary/80 relative animate-bounce bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent delay-150">
            Link
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/30 absolute top-1/4 left-1/4 h-1 w-1 animate-ping rounded-full delay-500"></div>
        <div className="bg-accent/40 absolute top-3/4 right-1/4 h-1 w-1 animate-ping rounded-full delay-1000"></div>
        <div className="bg-primary/20 absolute bottom-1/4 left-1/3 h-1 w-1 animate-ping rounded-full delay-1500"></div>
      </div>
    </div>
  );
};

export default Loading;
