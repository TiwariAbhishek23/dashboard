import type { BlockquoteOptions as TiptapBlockquoteOptions } from '@tiptap/extension-blockquote';
import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';

import { ActionButton } from '@/components/ui';
import type { GeneralOptions } from '@/types/types';

export interface BlockquoteOptions
  extends TiptapBlockquoteOptions,
  GeneralOptions<BlockquoteOptions> {}

export const Blockquote = TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote',
      },
      button: ({ editor, t }: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBlockquote(),
          isActive: () => editor.isActive('blockquote') || false,
          disabled: !editor.can().toggleBlockquote(),
          icon: 'TextQuote',
          shortcutKeys: ['shift', 'mod', 'B'],
        },
      }),
    };
  },
});
