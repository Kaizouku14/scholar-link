"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline as UnderlineIcon,
  Strikethrough,
  LinkIcon,
  Trash,
  MinusIcon,
  Brush,
  Ban,
} from "lucide-react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { ToolbarButton } from "./tool-bar-button";
import { extensions } from "@/lib/titap-extenstions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScholarshipEditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

export default function ScholarshipEditor({
  value,
  onChange,
}: ScholarshipEditorProps) {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => onChange?.(JSON.stringify(editor.getJSON())),
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
    {
      value: "horizontalRule",
      icon: MinusIcon,
      command: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: () => false,
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
      icon: TextQuote,
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

  const popoverActions = [
    {
      value: "textColor",
      render: () => (
        <Popover key="textColor">
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-full" size="icon">
              <Brush className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit items-center gap-2 p-2">
            {[
              "hsl(350, 80%, 55%)", // Dark Red
              "hsl(120, 60%, 45%)", // Dark Green
              "hsl(240, 80%, 55%)", // Dark Blue
              "hsl(50, 90%, 55%)",
            ].map((color) => (
              <Button
                key={color}
                style={{ backgroundColor: color }}
                className="h-6 w-6 p-0"
                onClick={() => editor.chain().focus().setColor(color).run()}
              />
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              <Ban className="text-muted-foreground" />
            </Button>
          </PopoverContent>
        </Popover>
      ),
    },
    {
      value: "link",
      render: () => (
        <Popover key="link">
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-full">
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex gap-2 p-2">
            <Input
              placeholder="paste a link"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  const url = target.value;
                  editor
                    .chain()
                    .focus()
                    .insertContent(
                      `<a href="${target.value}">${target.value}</a>`,
                    )
                    .setLink({ href: url })
                    .run();
                  target.value = "";
                }
              }}
            />
            <Button
              variant="outline"
              size={"icon"}
              onClick={() => {
                editor.chain().focus().unsetLink().run();
              }}
            >
              <Trash size={16} />
            </Button>
          </PopoverContent>
        </Popover>
      ),
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

        <ToggleGroup type="single" variant="outline" className="flex gap-1">
          {popoverActions.map((action) => (
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
