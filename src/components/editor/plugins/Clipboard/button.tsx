import { useEditor } from "@tiptap/react";
import { Button } from "@/components/ui/Button";
import type { Editor } from "@tiptap/core";

const ClipboardButton = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
        <Button
            onClick={() => editor.chain().focus().insertContent('<clipboardPlugin></clipboardPlugin>').run()}
        >
            📋 Insert Clipboard
        </Button>
    );
};

export default ClipboardButton;
