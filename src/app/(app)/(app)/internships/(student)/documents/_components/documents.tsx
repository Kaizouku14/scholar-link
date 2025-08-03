"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import DocumentList, { type DocumentCardProps } from "./document-list";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Documents = () => {
  const { data: uploadedDocuments } =
    api.internships.getUserUploadedDocuments.useQuery();

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

  return (
    <Tabs defaultValue="documents" className="h-96 w-full">
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

      <TabsContent
        value="documents"
        className="border-border rounded-xl border p-4"
      >
        <h3 className="mb-4 text-lg font-semibold">All Documents</h3>
        {filteredDocuments.all.length === 0 ? (
          <div className="flex h-74 items-center justify-center">
            <p className="text-muted-foreground">No documents uploaded yet.</p>
          </div>
        ) : (
          <ScrollArea className="flex h-74 gap-2">
            {filteredDocuments.all.map((doc) => (
              <DocumentList key={doc.documentId} documents={doc} />
            ))}
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
          <ScrollArea className="flex h-74 gap-2">
            {filteredDocuments.pending.map((doc) => (
              <DocumentList key={doc.documentId} documents={doc} />
            ))}
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
            <p className="text-muted-foreground">No approved documents yet.</p>
          </div>
        ) : (
          <ScrollArea className="flex h-74 gap-2">
            {filteredDocuments.approved.map((doc) => (
              <DocumentList key={doc.documentId} documents={doc} />
            ))}
          </ScrollArea>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Documents;
