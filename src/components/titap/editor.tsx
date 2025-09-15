"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import { extensions } from "@/lib/titap-extenstions";
import { cn } from "@/lib/utils";
import { ToolBarItem } from "./tool-bar-item";
import { useEffect } from "react";

interface Editor {
  value?: string | JSONContent;
  onChange?: (content: string) => void;
  className?: string;
  editable?: boolean;
}

export default function TipTapEditor({
  value,
  onChange,
  className,
  editable = false,
}: Editor) {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => onChange?.(JSON.stringify(editor.getJSON())),
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[200px] scholarship-content",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  if (!editor) return null;

  return (
    <div className="w-full space-y-4">
      {editable && <ToolBarItem editor={editor} />}

      <EditorContent
        editor={editor}
        className={cn(
          "bg-background focus-within:ring-ring border-border w-full overflow-auto rounded-lg border p-4 focus-within:ring-2 focus-within:ring-offset-2",
          className,
        )}
      />
    </div>
  );
}
