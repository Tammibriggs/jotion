"use client";

import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, BlockNoteView } from "@blocknote/core";
import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";
import { Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { InlineContentSchema, StyleSchema, BlockConfig } from "@blocknote/core";
import { ComponentProps } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

declare module "@blocknote/core" {
  const BlockNoteView: <
    BSchema extends Record<string, BlockConfig>,
    ISchema extends InlineContentSchema,
    SSchema extends StyleSchema,
  >(
    props: Omit<
      ComponentProps<typeof BlockNoteViewRaw<BSchema, ISchema, SSchema>>,
      "theme"
    > & {
      editable?: boolean;
      editor: BlockNoteEditor<BSchema, ISchema, SSchema>;
      onChange?: () => void;
      theme?: "light" | "dark" | Theme | { light: Theme; dark: Theme };
    }
  ) => any;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
