"use client";

import type { Editor } from '@tiptap/core';

import { BubbleMenuImage, BubbleMenuLink, BubbleMenuText, TableBubbleMenu } from '@/components/ui';
import type { BubbleMenuProps as BubbleMenuPropsType } from '@/types/types';

export interface BubbleMenuComponentProps {
  editor: Editor
  disabled?: boolean
  bubbleMenu?: BubbleMenuPropsType
}

/**
 * Bubble Menu Component
 *
 * @param editor Editor instance
 * @param disabled Whether the menu is disabled
 * @param bubbleMenu Bubble menu configuration
 * @returns Bubble menu component
 */
export function BubbleMenu({ editor, disabled, bubbleMenu }: BubbleMenuComponentProps) {
  const extensionsNames = editor.extensionManager.extensions.map(ext => ext.name);

  const renderMenuItems = () => [
    extensionsNames.includes('table') && !bubbleMenu?.tableConfig?.hidden ? <TableBubbleMenu key="table" editor={editor} /> : null,
    extensionsNames.includes('link') && !bubbleMenu?.linkConfig?.hidden ? <BubbleMenuLink key="link" editor={editor} disabled={disabled} /> : null,
    extensionsNames.includes('image') && !bubbleMenu?.imageConfig?.hidden ? <BubbleMenuImage key="image" editor={editor} disabled={disabled} /> : null,
    !bubbleMenu?.textConfig?.hidden ? <BubbleMenuText key="text" editor={editor} disabled={disabled} /> : null,
  ];

  if (bubbleMenu?.render) {
    return bubbleMenu.render({ editor, disabled: disabled || false, bubbleMenu }, renderMenuItems());
  }

  return renderMenuItems().filter(Boolean);
}
