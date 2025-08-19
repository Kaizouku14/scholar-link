"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import DocumentList from "./document-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Documents = () => {
  const {
    data: uploadedDocuments,
    refetch,
    isLoading,
  } = api.internships.getUserUploadedDocuments.useQuery();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const transformedDocuments = useMemo(() => {
    if (!uploadedDocuments) return [];

    return uploadedDocuments
      .filter((doc) => doc.documentUrl)
      .map((doc) => ({
        documentId: doc.documentId,
        documentType: doc.documentType,
        documentUrl: doc.documentUrl!,
        submittedAt: doc.submittedAt!,
        status: doc.status!,
      }));
  }, [uploadedDocuments]);

  const filteredDocuments = useMemo(() => {
    return {
      all: transformedDocuments,
      pending: transformedDocuments.filter(
        (doc) => doc.status && doc.status.toLowerCase() === "pending",
      ),
      approved: transformedDocuments.filter(
        (doc) => doc.status && doc.status.toLowerCase() === "approved",
      ),
    };
  }, [transformedDocuments]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <Tabs defaultValue="documents" className="h-96 w-full">
      <div className="flex gap-2">
        <TabsList className="gap-x-2 rounded">
          <TabsTrigger value="documents" className="rounded">
            My Documents
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded">
            Pending ({filteredDocuments.pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="rounded">
            Approved ({filteredDocuments.approved.length})
          </TabsTrigger>
        </TabsList>
        <Button
          size={"icon"}
          variant={"outline"}
          className="cursor-pointer"
          onClick={handleRefresh}
        >
          <RefreshCcw
            className={`${(isLoading || isRefreshing) && "animate-spin"} size-4`}
          />
        </Button>
      </div>
      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-xl" />
      ) : (
        <>
          <TabsContent
            value="documents"
            className="border-border rounded-xl border p-4"
          >
            <h3 className="mb-4 text-lg font-semibold">All Documents</h3>
            {filteredDocuments.all.length === 0 ? (
              <div className="flex h-74 items-center justify-center">
                <p className="text-muted-foreground">
                  No documents uploaded yet.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-74">
                <div className="grid grid-cols-3 gap-2">
                  {filteredDocuments.pending.map((doc) => (
                    <DocumentList key={doc.documentId} documents={doc} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent
            value="pending"
            className="border-border rounded-xl border p-4"
          >
            <h3 className="mb-4 text-lg font-semibold">Pending Review</h3>
            {filteredDocuments.pending.length === 0 ? (
              <div className="flex h-74 items-center justify-center">
                <p className="text-muted-foreground">No pending documents.</p>
              </div>
            ) : (
              <ScrollArea className="h-74">
                <div className="grid grid-cols-3 gap-2">
                  {filteredDocuments.pending.map((doc) => (
                    <DocumentList key={doc.documentId} documents={doc} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent
            value="approved"
            className="border-border rounded-xl border p-4"
          >
            <h3 className="mb-4 text-lg font-semibold">Approved Documents</h3>
            {filteredDocuments.approved.length === 0 ? (
              <div className="flex h-74 items-center justify-center">
                <p className="text-muted-foreground">
                  No approved documents yet.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-74">
                <div className="grid grid-cols-3 gap-2">
                  {filteredDocuments.pending.map((doc) => (
                    <DocumentList key={doc.documentId} documents={doc} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default Documents;
