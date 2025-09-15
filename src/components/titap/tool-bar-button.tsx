import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn, formatText } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarButtonProps {
  value: string;
  icon?: LucideIcon;
  command?: () => void;
  isActive?: () => boolean;
  render?: () => React.ReactNode;
}

export const ToolbarButton = ({
  value,
  icon: Icon,
  command,
  isActive,
  render,
}: ToolbarButtonProps) => {
  if (render) return <>{render()}</>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem
          value={value}
          aria-label={value}
          size="lg"
          onClick={command}
          className={cn(
            isActive && isActive() && "bg-accent text-accent-foreground",
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent>
        <p>{formatText(value)}</p>
      </TooltipContent>
    </Tooltip>
  );
};
