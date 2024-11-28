"use client";

import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

interface EnhancedBlockNoteViewProps {
  editable?: boolean;
  editor: any;
  onChange?: () => void;
  theme?: any;
}

const EnhancedBlockNoteView: React.FC<EnhancedBlockNoteViewProps> = ({
  theme,
  ...props
}) => {
  return <BlockNoteView theme={theme} {...props} />;
};

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
      <EnhancedBlockNoteView
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
