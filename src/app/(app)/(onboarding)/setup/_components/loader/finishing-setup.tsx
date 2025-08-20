const FinishingSetup = () => {
  return (
    <div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute top-1/4 left-1/4 h-2 w-2 animate-bounce rounded-full delay-0"></div>
        <div className="bg-primary/30 absolute top-1/3 right-1/4 h-1 w-1 animate-bounce rounded-full delay-300"></div>
        <div className="bg-primary/15 absolute bottom-1/3 left-1/3 h-1.5 w-1.5 animate-bounce rounded-full delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-2">
        <div className="space-y-2 text-center">
          <h2 className="from-foreground via-primary to-foreground animate-pulse bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            Finishing Setup
          </h2>
          <div className="via-primary mx-auto h-0.5 w-16 bg-gradient-to-r from-transparent to-transparent"></div>
        </div>

        <div className="max-w-sm space-y-3 text-center">
          <p className="text-muted-foreground/90 text-base leading-relaxed">
            Processing your data and preparing your personalized dashboard
          </p>

          <div className="flex justify-center space-x-2">
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full delay-0"></div>
            <div className="bg-primary/70 h-2 w-2 animate-bounce rounded-full delay-150"></div>
            <div className="bg-primary/40 h-2 w-2 animate-bounce rounded-full delay-300"></div>
          </div>

          <p className="text-muted-foreground/70 text-sm font-medium">
            This won&apos;t take long
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishingSetup;
