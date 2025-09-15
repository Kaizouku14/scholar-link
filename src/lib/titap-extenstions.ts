import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { TableKit } from "@tiptap/extension-table";

export const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  Color,
  Placeholder.configure({
    placeholder:
      "Describe your scholarship program, eligibility requirements, application process, and deadlines...",
  }),
  TableKit.configure({
    table: { resizable: true },
  }),
];
