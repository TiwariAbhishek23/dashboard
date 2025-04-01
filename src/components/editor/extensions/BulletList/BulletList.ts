import type { BulletListOptions as TiptapBulletListOptions } from '@tiptap/extension-bullet-list';
import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list';
import { ActionButton } from '@/components/ui';
import type { GeneralOptions } from '@/types/types';

// Extend options to include bullet styles
export interface BulletListOptions
  extends TiptapBulletListOptions,
    GeneralOptions<BulletListOptions> {
  bulletStyles?: string[]; // e.g., ['disc', 'circle', 'square']
}

export const BulletList = TiptapBulletList.extend<BulletListOptions>({
  // Allow nested lists
  addAttributes() {
    return {
      ...this.parent?.(),
      type: {
        default: 'disc', // Default to dot bullets
        parseHTML: (element) => element.getAttribute('data-type') || 'disc',
        renderHTML: (attributes) => ({
          'data-type': attributes.type,
          class: `custom-list ${
            attributes.type === 'circle'
              ? 'list-circle'
              : attributes.type === 'square'
              ? 'list-square'
              : 'list-disc'
          }`,
        }),
      },
      level: {
        default: 1, // Default nesting level
        parseHTML: (element) => parseInt(element.getAttribute('data-level') || '1'),
        renderHTML: (attributes) => ({
          'data-level': attributes.level,
          class: `ml-${(attributes.level - 1) * 2}`,
        }),
      },
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      bulletStyles: ['disc', 'circle', 'square'], // Supported styles
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            const isBulletListActive = editor.isActive('bulletList');
            const isOrderedListActive = editor.isActive('orderedList');

            if (isBulletListActive) {
              // Toggle to ordered list if bullet list is active
              editor.commands.toggleOrderedList();
            } else if (isOrderedListActive) {
              // Toggle back to bullet list
              editor.commands.toggleBulletList();
            } else {
              // Default to bullet list if neither is active
              editor.commands.toggleBulletList();
            }
          },
          isActive: () => editor.isActive('bulletList') || editor.isActive('orderedList'),
          disabled: false,
          icon: 'List',
          shortcutKeys: ['mod', 'shift', '8'],
          tooltip: t('editor.bulletlist.tooltip'),
        },
      }),
    };
  },

  // Add support for different bullet styles
  renderHTML({ node, HTMLAttributes }) {
    const type = HTMLAttributes['data-type'] || 'disc';
    const level = HTMLAttributes['data-level'] || 1;

    return [
      'ul',
      {
        ...HTMLAttributes,
        'data-type': type,
        'data-level': level,
        class: `custom-list ${
          type === 'circle'
            ? 'list-circle'
            : type === 'square'
            ? 'list-square'
            : 'list-disc'
        } ml-${(level - 1) * 2}`,
      },
      0, // Placeholder for child content
    ];
  },

  // Parse nested lists and styles from HTML
  parseHTML() {
    return [
      {
        tag: 'ul',
        getAttrs: (element) => ({
          type: element.getAttribute('data-type') || 'disc',
          level: parseInt(element.getAttribute('data-level') || '1'),
        }),
      },
    ];
  },
});

// Optional: Add commands to switch bullet styles
BulletList.configure({
  HTMLAttributes: {
    class: 'custom-list',
  },
});
