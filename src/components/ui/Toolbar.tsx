import React, { useMemo } from 'react';
import type { Editor } from '@tiptap/core';
import type { ToolbarItemProps, ToolbarProps } from '@/types/types';

import { Separator } from '@/components/ui';
import { useLocale } from '@/locales';
import { isFunction } from '@/utils/utils';

export interface ToolbarComponentProps {
  editor: Editor
  disabled?: boolean
  toolbar?: ToolbarProps
}

const Toolbar = ({ editor, disabled, toolbar }: ToolbarComponentProps) => {
  const { t, lang } = useLocale();

  const toolbarItems = useMemo(() => {
    const extensions = [...editor.extensionManager.extensions];
    const sortExtensions = extensions.sort((arr, acc) => {
      const a = (arr.options).sort ?? -1;
      const b = (acc.options).sort ?? -1;
      return a - b;
    });

    let menus: ToolbarItemProps[] = [];

    for (const extension of sortExtensions) {
      const {
        button,
        divider = false,
        spacer = false,
        toolbar = true,
      } = extension.options;
      if (!button || !isFunction(button) || !toolbar) {
        continue;
      }

      const _button: ToolbarItemProps['button'] | ToolbarItemProps['button'][] = button({
        editor,
        extension,
        t,
      });

      if (Array.isArray(_button)) {
        const menu: ToolbarItemProps[] = _button.map((k, i) => ({
          button: k,
          divider: i === _button.length - 1 ? divider : false,
          spacer: i === 0 ? spacer : false,
          type: extension.type,
          name: extension.name,
        }));
        menus = [...menus, ...menu];
        continue;
      }

      menus.push({
        button: _button,
        divider,
        spacer,
        type: extension.type,
        name: extension.name,
      });
    }
    return menus;
  }, [editor, t, lang]);

  const containerDom = (innerContent: React.ReactNode) => {
    return (
      <div
      className="flex items-center bg-gray-200 select-none sticky scrollbar-hide w-full justify-between overflow-x-auto  border-b border-b-border backdrop-blur-sm supports-backdrop-blur:bg-background/60 [&::-webkit-scrollbar]:hidden "
        style={{
          pointerEvents: disabled ? 'none' : 'auto',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div className="relative flex h-auto gap-y-1 gap-x-1">
          {innerContent}
        </div>
      </div>
    );
  };

  const dom = toolbarItems.map((item: ToolbarItemProps, key) => {
    const ButtonComponent = item.button.component;

    return (
      <div className="flex items-center" key={`toolbar-item-${key}`}>
        {item?.spacer && <Separator orientation="vertical" className="!h-[16px] !mx-[10px]" />}

        <ButtonComponent
          {...item.button.componentProps}
          disabled={disabled || item?.button?.componentProps?.disabled}
        />

        {item?.divider && <Separator orientation="vertical" className="!h-auto !mx-2" />}
      </div>
    );
  });

  if (toolbar && toolbar?.render) {
    return toolbar.render({ editor, disabled: disabled || false }, toolbarItems, dom, containerDom);
  }

  return containerDom(dom);
}

export { Toolbar };
