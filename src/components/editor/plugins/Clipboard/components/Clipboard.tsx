import { Node } from '@tiptap/core';
import type { Node as TiptapNode } from '@tiptap/pm/model';
import { mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';

import { Button } from '@/components/ui/Button';

import React from 'react';

const ClipboardPluginNode = Node.create({
    name: 'clipboardPlugin',
    group: 'inline',
    inline: true,
    atom: true,
    draggable: false,

    addAttributes() {
        return {
            label: {
                default: 'Clipboard',
            },
        };
    },

    parseHTML() {
        return [{ tag: 'span[data-clipboard-plugin]' }];
    },

    renderHTML({ HTMLAttributes, node }) {
        return ['span',
            mergeAttributes(HTMLAttributes, { 'data-clipboard-plugin': '' }),
            ['button', {}, ['span', {}, ':)'],
            node.attrs.label],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ClipboardComponent);
    }
});

const ClipboardComponent = ({ node }: { node: TiptapNode }) => {
    return (
        <NodeViewWrapper as="span" data-clipboard-plugin="">
            <Button>
                <span>📋</span> {node.attrs.label}
            </Button>
        </NodeViewWrapper>
    );
};

export default ClipboardPluginNode;