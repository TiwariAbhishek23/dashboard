'use client';

import React from 'react';

import { ToolbarGroup } from '@/components/ui/Toolbar';


export function FixedToolbarButtons() {
  const readOnly = false;

  return (
    <div className="flex w-full flex-wrap">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <AIToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <FontFamilyToolbarButton />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <BoldToolbarButton />
            <ItalicToolbarButton />
            <UnderlineToolbarButton />
            <StrikethroughToolbarButton />
            <TextColorToolbarButton />
            <HighlightToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignDropdownMenu />
            <NumberedIndentListToolbarButton />
            <BulletedIndentListToolbarButton />
            <IndentTodoToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
            <TableDropdownMenu />
            <EmojiDropdownMenu />
            <ImageToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LineHeightDropdownMenu />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <SubscriptToolbarButton />
            <SuperscriptToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <ClearFormattingButton />
            <CopyFormattingButton />
          </ToolbarGroup>
        </>
      )}
      <ToolbarGroup>
        <ModeToggleButton />
      </ToolbarGroup>
    </div>
  );
}
