import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export const ToolbarButton = ({
  value,
  icon: Icon,
  command,
  isActive,
}: {
  value: string;
  icon: LucideIcon;
  command: () => void;
  isActive: () => boolean;
}) => (
  <ToggleGroupItem
    value={value}
    aria-label={value}
    size="lg"
    onClick={command}
    className={cn(isActive() && "bg-accent text-accent-foreground")}
  >
    <Icon className="h-4 w-4" />
  </ToggleGroupItem>
);
