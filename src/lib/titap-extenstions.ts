import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Color, TextStyle } from "@tiptap/extension-text-style";

export const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  Blockquote,
  Underline,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Link,
  TextStyle,
  Color,
  HorizontalRule,
  Placeholder.configure({
    placeholder:
      "Describe your scholarship program, eligibility requirements, application process, and deadlines...",
  }),
];
