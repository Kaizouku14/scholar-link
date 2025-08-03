"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import DocumentList, { type DocumentCardProps } from "./document-list";

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
      rejected: transformedDocuments.filter(
        (doc) => doc.status && doc.status.toLowerCase() === "rejected",
      ),
    };
  }, [transformedDocuments]);

  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="gap-x-2 rounded">
        <TabsTrigger value="documents" className="rounded">
          My Documents ({filteredDocuments.all.length})
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
          <p className="text-muted-foreground">No documents uploaded yet.</p>
        ) : (
          <>
            {filteredDocuments.all.map((doc) => (
              <DocumentList key={doc.documentId} documents={doc} />
            ))}
          </>
        )}
      </TabsContent>

      <TabsContent
        value="pending"
        className="border-border rounded-xl border p-4"
      >
        <h3 className="mb-4 text-lg font-semibold">Pending Review</h3>
        {filteredDocuments.pending.length === 0 ? (
          <p className="text-muted-foreground">No pending documents.</p>
        ) : (
          <>
            {filteredDocuments.pending.map((doc) => (
              <DocumentList key={doc.documentId} documents={doc} />
            ))}
          </>
        )}
      </TabsContent>

      <TabsContent
        value="approved"
        className="border-border rounded-xl border p-4"
      >
        <h3 className="mb-4 text-lg font-semibold">Approved Documents</h3>
        {filteredDocuments.approved.length === 0 ? (
          <p className="text-muted-foreground">No approved documents yet.</p>
        ) : (
          <>
            {filteredDocuments.approved.map((doc) => (
              <DocumentList key={doc.documentId} documents={doc} />
            ))}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Documents;
