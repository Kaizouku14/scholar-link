import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormFieldProps } from "@/interfaces/scholarship-form";

interface FieldPreviewProps {
  field: FormFieldProps;
}

/**
 * Field Preview component
 * Shows a preview of how the form field will appear to users
 */
export function FieldPreview({ field }: FieldPreviewProps) {
  const renderPreview = () => {
    switch (field.type) {
      case "text":
        return (
          <div className="flex flex-col">
            <Input placeholder={field.placeholder} disabled />
            <div className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </div>
          </div>
        );

      case "textarea":
        return (
          <div className="flex flex-col">
            <Textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={field.placeholder}
              disabled
            />
            <div className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </div>
          </div>
        );

      case "file":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Input type="file" accept=".pdf,.doc,.docx" disabled />
            <div className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </div>
          </div>
        );

      case "photo":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              className="cursor-pointer"
              disabled
            />
            <div className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col">
            <Input placeholder={field.placeholder} disabled />
            <div className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="border-border rounded-md border bg-gray-400/10 p-4">
      <div className="text-muted-foreground mb-2 text-sm font-medium">
        Preview:
      </div>
      {renderPreview()}
      {field.required && (
        <div className="text-primary/80 mt-2 text-xs">* Required field</div>
      )}
    </div>
  );
}

export default FieldPreview;
