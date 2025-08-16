/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FileDropArea } from "./file-drop-area";

interface CSVImportProps {
  onImportCompleteAction: () => void;
}

export function CSVImport({ onImportCompleteAction }: CSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  //   const importMutation = api.product.uploadCSV.useMutation();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      //   await importMutation.mutateAsync(formData);
      toast.success("CSV imported successfully!");
      setFile(null);
      onImportCompleteAction();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error importing CSV:", error);
        toast.error("Failed to import CSV");
      }
    }
  };

  return (
    <div className="space-y-4">
      <FileDropArea
        onFileSelectAction={handleFileSelect}
        acceptedFileTypes={[".csv"]}
        maxFileSize={5 * 1024 * 1024} // 5MB
      />
      {/* <Button
        onClick={handleImport}
        disabled={!file || importMutation.isPending}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {importMutation.isPending ? "Importing..." : "Import CSV"}
      </Button> */}
    </div>
  );
}
