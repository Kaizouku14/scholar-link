import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

interface HTMLContentProps {
  content: string;
}

export default function ScholarshipDetails({ content }: HTMLContentProps) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className={cn(
        "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none",
        "prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground",
        "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
        "prose-strong:text-foreground prose-code:text-foreground",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:marker:text-muted-foreground",
      )}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
