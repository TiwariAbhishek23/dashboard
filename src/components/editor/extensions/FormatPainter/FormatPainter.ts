/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Extension } from '@tiptap/core';
import type { Mark } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';

import { ActionButton } from '@/components/ui';
import type { GeneralOptions } from '@/types/types';

/**
 * Represents the interface for font size options, extending GeneralOptions.
 */
export interface FormatPainterOptions extends GeneralOptions<FormatPainterOptions> {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    painter: {
      setPainter: (marks: Mark[]) => ReturnType
    }
  }
}

export interface PainterAction {
  type: 'start' | 'end'
  marks: Mark[]
}
/**
 * 格式刷
 */
export const FormatPainter = Extension.create<FormatPainterOptions>({
  name: 'painter',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            editor.commands.setPainter(editor?.state.selection.$head.marks() as Mark[]);
          },
          icon: 'PaintRoller',
          tooltip: t('editor.format'),
        },
      }),
    };
  },
  addCommands() {
    return {
      setPainter:
        (marks: Mark[]) =>
          ({
            view: {
              dispatch,
              state: { tr },
              dom,
            },
          }) => {
            const svgCursor
            = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path class="bentblocks_een" d="M25 7V4H6v14c0 1.1.9 2 2 2s2-.9 2-2v-4c0 1.1.9 2 2 2s2-.9 2-2v-2h11V9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-8c-1.654 0-3 1.346-3 3-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2a1 1 0 0 1 1-1h8c1.654 0 3-1.346 3-3v-4c0-1.654-1.346-3-3-3m-2 3H8V6h15zm-7 16h-2v-1h2zm0-3h-2v-3h2z"/></svg>';
            const encodedSvg = encodeURIComponent(svgCursor);
            const cursorUrl = `url("data:image/svg+xml;utf8,${encodedSvg}"), auto`;

            dom.style.cursor = cursorUrl;
            dispatch(tr.setMeta('painterAction', { type: 'start', marks }));
            return true;
          },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('format-painter'),
        state: {
          init: () => [] as Mark[],
          apply: (tr, set) => {
            const action = tr.getMeta('painterAction') as PainterAction;
            if (action && action.type === 'start') {
              set = action.marks;
            } else if (action && action.type === 'end') {
              set = [];
            }
            return set;
          },
        },
        props: {
          handleDOMEvents: {
            mousedown(view) {
              const marks = this.getState(view.state) as Mark[];
              if (!marks || marks.length === 0) {
                view.dom.style.cursor = '';
                return false; // 如果没有标记，则不执行任何操作
              }
              const mouseup = () => {
                document.removeEventListener('mouseup', mouseup);

                let {
                  dispatch,
                  state: { tr, selection },
                  dom,
                } = view as any;
                dom.style.cursor = '';

                tr = tr.removeMark(selection.from, selection.to);
                for (const mark of marks) {
                  if (mark.type.name !== 'link') {
                    tr = tr.addMark(selection.from, selection.to, mark);
                  }
                }

                dispatch(tr.setMeta('painterAction', { type: 'end' }));
              };
              document.addEventListener('mouseup', mouseup);
              return true;
            },
          },
        },
      }),
    ];
  },
});
