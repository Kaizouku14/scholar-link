"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import { extensions } from "@/lib/titap-extenstions";

export default function RenderContent({ content }: { content: string }) {
  const editor = useEditor({
    extensions,
    content: JSON.parse(content) as JSONContent,
    editable: false, // read-only
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
