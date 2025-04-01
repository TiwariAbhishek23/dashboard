import type { Editor } from '@tiptap/core';
import { isActive } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import type { GetReferenceClientRect } from 'tippy.js';
import { sticky } from 'tippy.js';

import { ActionButton, Separator } from '@/components/ui';
import HighlightActionButton from '@/components/editor/extensions/Highlight/components/HighlightActionButton';
import { useLocale } from '@/locales';

export interface TableBubbleMenuProps {
  editor: Editor
  disabled?: boolean
}

function TableBubbleMenu({ editor, disabled }: TableBubbleMenuProps) {
  const shouldShow = ({ editor }: { editor: Editor }) => {
    return isActive(editor.view.state, 'table');
  };
  const { t } = useLocale();

  function onAddColumnBefore() {
    editor.chain().focus().addColumnBefore().run();
  }

  function onAddColumnAfter() {
    editor.chain().focus().addColumnAfter().run();
  }

  function onDeleteColumn() {
    editor.chain().focus().deleteColumn().run();
  }
  function onAddRowAbove() {
    editor.chain().focus().addRowBefore().run();
  }

  function onAddRowBelow() {
    editor.chain().focus().addRowAfter().run();
  }

  function onDeleteRow() {
    editor.chain().focus().deleteRow().run();
  }

  function onMergeCell() {
    editor.chain().focus().mergeCells().run();
  }
  function onSplitCell() {
    editor?.chain().focus().splitCell().run();
  }
  function onDeleteTable() {
    editor.chain().focus().deleteTable().run();
  }

  function onSetCellBackground(color: string) {
    editor.chain().focus().setTableCellBackground(color).run();
  }
  const getReferenceClientRect: GetReferenceClientRect = () => {
    const {
      view,
      state: {
        selection: { from },
      },
    } = editor;

    const node = view.domAtPos(from).node as HTMLElement;
    if (!node) {
      return new DOMRect(-1000, -1000, 0, 0);
    }

    const tableWrapper = node?.closest?.('.tableWrapper');
    if (!tableWrapper) {
      return new DOMRect(-1000, -1000, 0, 0);
    }

    const rect = tableWrapper.getBoundingClientRect();

    return rect;
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="table"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        maxWidth: 'auto',
        getReferenceClientRect,
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      {
        disabled
          ? <></>
          : (
            <div className="min-w-32 flex flex-row h-full items-center leading-none gap-0.5 p-2 w-full bg-background rounded-lg shadow-sm !border border-border">
              <ActionButton
                icon="BetweenHorizonalEnd"
                tooltip={t('editor.table.menu.insertColumnBefore')}
                action={onAddColumnBefore}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.addColumnBefore?.()}
              />
              <ActionButton
                icon="BetweenHorizonalStart"
                tooltip={t('editor.table.menu.insertColumnAfter')}
                action={onAddColumnAfter}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.addColumnAfter?.()}
              />
              <ActionButton
                icon="DeleteColumn"
                action={onDeleteColumn}
                tooltip={t('editor.table.menu.deleteColumn')}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can().deleteColumn?.()}
              />
              <Separator orientation="vertical" className="!mx-1 !my-2 !h-[16px]" />

              <ActionButton
                icon="BetweenVerticalEnd"
                action={onAddRowAbove}
                tooltip={t('editor.table.menu.insertRowAbove')}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can().addRowBefore?.()}
              />

              <ActionButton
                icon="BetweenVerticalStart"
                action={onAddRowBelow}
                tooltip={t('editor.table.menu.insertRowBelow')}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.addRowAfter?.()}
              />
              <ActionButton
                icon="DeleteRow"
                action={onDeleteRow}
                tooltip={t('editor.table.menu.deleteRow')}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.deleteRow?.()}
              />
              <Separator orientation="vertical" className="!mx-1 !my-2 !h-[16px]" />
              <ActionButton
                icon="TableCellsMerge"
                action={onMergeCell}
                tooltip={t('editor.table.menu.mergeCells')}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.mergeCells?.()}
              />
              <ActionButton
                icon="TableCellsSplit"
                action={onSplitCell}
                tooltip={t('editor.table.menu.splitCells')}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.splitCell?.()}
              />
              <Separator orientation="vertical" className="!mx-1 !my-2 !h-[16px]" />

              <HighlightActionButton
                editor={editor}
                tooltip={t('editor.table.menu.setCellsBgColor')}
                action={onSetCellBackground}
                tooltipOptions={{
                  sideOffset: 15,
                }}
              />
              <ActionButton
                icon="Trash2"
                tooltip={t('editor.table.menu.deleteTable')}
                action={onDeleteTable}
                tooltip-options={{
                  sideOffset: 15,
                }}
                disabled={!editor?.can()?.deleteTable?.()}
              />
            </div>
          )
      }

    </BubbleMenu>
  );
}

export { TableBubbleMenu };
