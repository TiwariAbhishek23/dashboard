import type { OrderedListOptions as TiptapOrderedListOptions } from '@tiptap/extension-ordered-list';
import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list';
import { ActionButton } from '@/components/ui';
import type { GeneralOptions } from '@/types/types';

// Extend options to include bullet styles
export interface OrderedListOptions
  extends TiptapOrderedListOptions,
    GeneralOptions<OrderedListOptions> {
  bulletStyles?: string[]; // e.g., ['decimal', 'circle', 'square']
}

export const OrderedList = TiptapOrderedList.extend<OrderedListOptions>({
  // Allow nested lists
  addAttributes() {
    return {
      ...this.parent?.(),
      type: {
        default: 'decimal', // Default to numbered list
        parseHTML: (element) => element.getAttribute('data-type') || 'decimal',
        renderHTML: (attributes) => ({
          'data-type': attributes.type,
          class: `custom-list ${
            attributes.type === 'circle'
              ? 'list-circle'
              : attributes.type === 'square'
              ? 'list-square'
              : attributes.type === 'disc'
              ? 'list-disc'
              : 'list-decimal'
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
      bulletStyles: ['decimal', 'circle', 'square', 'disc'], // Supported styles
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            const isOrderedListActive = editor.isActive('orderedList');
            const isBulletListActive = editor.isActive('bulletList');

            if (isOrderedListActive) {
              // Toggle to bullet list if ordered list is active
              editor.commands.toggleBulletList();
            } else if (isBulletListActive) {
              // Toggle back to ordered list
              editor.commands.toggleOrderedList();
            } else {
              // Default to ordered list if neither is active
              editor.commands.toggleOrderedList();
            }
          },
          isActive: () => editor.isActive('orderedList') || editor.isActive('bulletList'),
          disabled: false,
          icon: 'ListOrdered', // You might want a different icon for bullet lists
          shortcutKeys: ['mod', 'shift', '7'],
          tooltip: t('editor.orderedlist.tooltip'),
        },
      }),
    };
  },

  // Add support for nested lists and bullet styles
  renderHTML({ node, HTMLAttributes }) {
    const type = HTMLAttributes['data-type'] || 'decimal';
    const level = HTMLAttributes['data-level'] || 1;

    // Use <ul> for bullet styles, <ol> for ordered styles
    const tag = ['circle', 'square', 'disc'].includes(type) ? 'ul' : 'ol';

    return [
      tag,
      {
        ...HTMLAttributes,
        'data-type': type,
        'data-level': level,
        class: `custom-list ${
          type === 'circle'
            ? 'list-circle'
            : type === 'square'
            ? 'list-square'
            : type === 'disc'
            ? 'list-disc'
            : 'list-decimal'
        } ml-${(level - 1) * 2}`,
      },
      0, // Placeholder for child content
    ];
  },

  // Parse nested lists and styles from HTML
  parseHTML() {
    return [
      {
        tag: 'ol',
        getAttrs: (element) => ({
          type: element.getAttribute('data-type') || 'decimal',
          level: parseInt(element.getAttribute('data-level') || '1'),
        }),
      },
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
OrderedList.configure({
  HTMLAttributes: {
    class: 'custom-list',
  },
});
