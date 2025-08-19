import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon, FileTextIcon, CalendarIcon } from "lucide-react";
import { DOCUMENT_LABELS, type documentsType } from "@/constants/documents";
import { format } from "date-fns";
import {
  cn,
  getStatusColor,
  getStatusIndicatorColor,
  getStatusVariant,
} from "@/lib/utils";

export interface DocumentCardProps {
  documentId: string;
  documentType: documentsType;
  documentUrl: string;
  submittedAt: Date;
  status: string;
}

const DocumentList = ({ documents }: { documents: DocumentCardProps }) => {
  return (
    <Card className="group from-card to-card/95 border-border/60 relative w-full max-w-sm overflow-hidden rounded-xl border bg-gradient-to-br">
      <div
        className={cn(
          "absolute top-0 right-0 left-0 h-1 transition-all duration-200",
          getStatusIndicatorColor(documents.status),
        )}
      />

      <CardHeader className="space-y-0 pb-3">
        <div className="flex min-w-0 flex-1 items-center space-x-3">
          <div className="bg-muted/50 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
            <FileTextIcon className="text-muted-foreground h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-foreground line-clamp-2 text-base leading-tight font-semibold">
              {DOCUMENT_LABELS[documents.documentType]}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid gap-4">
          <div className="space-y-3">
            <div className="text-muted-foreground flex items-center text-xs font-medium tracking-wide uppercase">
              <div className="mr-2 h-2 w-2 rounded-full bg-current opacity-60" />
              Document Status
            </div>

            <div className="flex items-center justify-between">
              <Badge
                variant={getStatusVariant(documents.status)}
                className={cn(
                  "border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
                  getStatusColor(documents.status),
                )}
              >
                {documents.status.replace(/_/g, " ")}
              </Badge>

              <div className="text-muted-foreground flex items-center text-xs">
                <CalendarIcon className="mr-1.5 h-3 w-3" />
                {format(documents.submittedAt, "MM/dd/yyyy")}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="border-input text-foreground hover:bg-accent mt-2 h-10 w-full cursor-pointer bg-transparent font-medium transition-all duration-200 hover:scale-[1.02]"
            onClick={() => window.open(documents.documentUrl, "_blank")}
          >
            <EyeIcon className="mr-2 h-4 w-4" />
            View Document
          </Button>

          <div className="text-muted-foreground border-border/50 flex items-center justify-between border-t pt-2 text-xs">
            <span>ID: {documents.documentId.slice(-8)}</span>
            <div className="flex items-center">
              <div
                className={cn(
                  "mr-1.5 h-2 w-2 rounded-full",
                  getStatusIndicatorColor(documents.status),
                )}
              />
              <span className="capitalize">{documents.status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentList;
