"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import { extensions } from "@/lib/titap-extenstions";
import { cn } from "@/lib/utils";

export default function RenderContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const editor = useEditor({
    extensions,
    content: JSON.parse(content) as JSONContent,
    editable: false, // default: read-only
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="w-full">
      <EditorContent editor={editor} className={cn(className)} />
    </div>
  );
}
