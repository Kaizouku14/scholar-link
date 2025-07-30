"use client";

import type React from "react";

import { useRef } from "react";
import { X, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  preview?: string;
  className?: string;
  accept?: string;
}

export function FileUpload({
  onFileSelect,
  preview,
  className,
  accept = "image/*",
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative">
        <div
          className={cn(
            "border-muted-foreground/30 bg-muted/50 flex h-20 w-30 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-all duration-200",
            preview && "border-muted border-solid",
          )}
        >
          {preview ? (
            <img
              src={preview || "/placeholder.svg"}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera className="text-muted-foreground h-8 w-8" />
          )}
        </div>

        {preview && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect(new File([], ""));
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="flex-1">
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full border-dashed bg-transparent transition-all duration-200"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          {preview ? "Change Photo" : "Upload Photo"}
        </Button>

        <p className="text-muted-foreground mt-2 text-center text-xs">
          PNG, JPG, WebP up to 5MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
