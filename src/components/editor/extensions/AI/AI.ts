import type { BoldOptions as TiptapImageOptions } from '@tiptap/extension-bold';
import { Bold as TiptapBold } from '@tiptap/extension-bold';

import { ActionButton } from '@/components/ui/ActionButton';
import type { GeneralOptions } from '@/types/types';

export interface AIOptions extends TiptapImageOptions, GeneralOptions<AIOptions> {}

export const AI = TiptapBold.extend<AIOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBold(),
          isActive: () => editor.isActive('bold') || false,
          disabled: !editor.can().toggleBold(),
          icon: 'Sparkles',
          shortcutKeys: ['mod', 'B'],
        },
      }),
    };
  },
});
