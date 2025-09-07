"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline as UnderlineIcon,
  Strikethrough,
} from "lucide-react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { ToolbarButton } from "./tool-bar-button";

interface ScholarshipEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

export default function ScholarshipEditor({
  value,
  onChange,
}: ScholarshipEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Blockquote,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder:
          "Describe your scholarship program, eligibility requirements, application process, and deadlines...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[200px] scholarship-content",
      },
    },
  });

  if (!editor) return null;

  const formattingActions = [
    {
      value: "bold",
      icon: Bold,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      value: "italic",
      icon: Italic,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      value: "underline",
      icon: UnderlineIcon,
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
    },
    {
      value: "strike",
      icon: Strikethrough,
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
  ];

  const headingActions = [
    {
      value: "h1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      value: "h2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      value: "h3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
  ];

  const listAndQuoteActions = [
    {
      value: "bulletList",
      icon: List,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      value: "orderedList",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      value: "blockquote",
      icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
  ];

  const alignActions = [
    {
      value: "alignLeft",
      icon: AlignLeft,
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () =>
        editor.isActive("paragraph", { textAlign: "left" }) ||
        editor.isActive("heading", { textAlign: "left" }),
    },
    {
      value: "alignCenter",
      icon: AlignCenter,
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () =>
        editor.isActive("paragraph", { textAlign: "center" }) ||
        editor.isActive("heading", { textAlign: "center" }),
    },
    {
      value: "alignRight",
      icon: AlignRight,
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () =>
        editor.isActive("paragraph", { textAlign: "right" }) ||
        editor.isActive("heading", { textAlign: "right" }),
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="bg-muted/20 flex flex-wrap gap-2 rounded-lg border p-3">
        <ToggleGroup
          type="multiple"
          className="flex flex-wrap"
          variant="outline"
        >
          {formattingActions.map((action) => (
            <ToolbarButton key={action.value} {...action} />
          ))}
          <Separator orientation="vertical" className="h-8" />

          {listAndQuoteActions.map((action) => (
            <ToolbarButton key={action.value} {...action} />
          ))}
        </ToggleGroup>

        <ToggleGroup type="single" variant="outline">
          {headingActions.map((action) => (
            <ToolbarButton key={action.value} {...action} />
          ))}
        </ToggleGroup>

        <ToggleGroup type="single" variant="outline">
          {alignActions.map((action) => (
            <ToolbarButton key={action.value} {...action} />
          ))}
        </ToggleGroup>
      </div>

      <EditorContent
        editor={editor}
        className="bg-background focus-within:ring-ring border-border min-h-[300px] w-full rounded-lg border p-4 focus-within:ring-2 focus-within:ring-offset-2"
      />
    </div>
  );
}
