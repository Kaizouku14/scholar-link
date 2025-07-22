import { Mail } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-center">
      <div className="bg-muted/50 rounded-full p-6">
        <Mail className="text-muted-foreground h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h3 className="text-foreground text-lg font-semibold">
          No email selected
        </h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          Select an email from the list to view its contents and reply to the
          conversation.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
