"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileDropAreaProps {
  onFileSelectAction: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export function FileDropArea({
  onFileSelectAction,
  acceptedFileTypes = [".csv", "text/csv"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
}: FileDropAreaProps) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        if (!selectedFile) {
          setError("No file selected");
          return;
        }

        if (selectedFile?.size > maxFileSize) {
          setError(
            `File size should not exceed ${maxFileSize / 1024 / 1024}MB`,
          );
        } else {
          setFile(selectedFile);
          if (selectedFile) {
            onFileSelectAction(selectedFile);
          }
        }
      }
    },
    [maxFileSize, onFileSelectAction],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, type) => {
        acc[type] = [];
        return acc;
      },
      {} as Record<string, string[]>,
    ),
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(undefined);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        {...getRootProps()}
        className={cn(
          "rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300",
          file ? "cursor-default" : "cursor-pointer",
        )}
      >
        <input {...getInputProps()} disabled={file !== undefined} />
        {file ? (
          <div className="space-y-4">
            <File className="text-primary mx-auto h-12 w-12" />
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={removeFile}>
              <X className="mr-2 h-4 w-4" />
              Remove file
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-sm font-medium">
              Drag & drop your file here, or click to select
            </p>
            <p className="text-xs text-gray-500">
              Accepted file types: {acceptedFileTypes.join(", ")}
            </p>
            <p className="text-xs text-gray-500">
              Max file size: {maxFileSize / 1024 / 1024}MB
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
