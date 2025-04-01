'use client';

import React, { useState, useEffect } from 'react';
import {
  ActionMenuButton,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useLocale } from '@/locales';
import { Plus, Minus } from 'lucide-react';
import type { ButtonViewReturnComponentProps } from '@/types/types';

export interface Item {
  title: string;
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>;
  action?: ButtonViewReturnComponentProps['action'];
  style?: React.CSSProperties;
  disabled?: boolean;
  divider?: boolean;
  default?: boolean;
}

interface IPropsFontSizeMenuButton {
  editor: any;
  disabled?: boolean;
  color?: string;
  shortcutKeys?: string[];
  maxHeight?: string | number;
  tooltip?: string;
  items?: Item[];
}

function FontSizeMenuButton(props: IPropsFontSizeMenuButton) {
  const { t } = useLocale();

  // State to track the current font size
  const [currentFontSize, setCurrentFontSize] = useState('10px');

  useEffect(() => {
    // Sync the current font size with the editor when the component mounts
    const activeItem = (props.items || []).find((item) => item.isActive());
    if (activeItem) {
      setCurrentFontSize(activeItem.title);
    }
  }, [props.items]);

  const adjustFontSize = (increment: number) => {
    const currentSize = parseFloat(currentFontSize.replace('px', '')) || 10;
    const newSize = Math.max(8, currentSize + increment);
    const newSizeStr = `${newSize}px`;

    // Update editor and state
    props.editor.commands.setFontSize(newSizeStr);
    setCurrentFontSize(newSizeStr); 
  };

  return (
    <div className="flex items-center space-x-0.5 bg-slate-50 rounded-full m-1">
      <button
        className="p-1 rounded-2xl hover:bg-gray-200 disabled:opacity-50"
        onClick={() => adjustFontSize(-1)}
        disabled={props?.disabled}
      >
        <Minus size={16} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={props?.disabled}>
          <ActionMenuButton
            disabled={props?.disabled}
            icon="MenuDown"
            title={currentFontSize === 'Default' ? '10px' : currentFontSize}
            tooltip={`${props?.tooltip}`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-96 w-32 overflow-y-auto">
          {props?.items?.map((item, index) => (
            <DropdownMenuCheckboxItem
              checked={currentFontSize === item.title}
              key={`font-size-${index}`}
              onClick={() => {
                item.action?.();
                setCurrentFontSize(item.title);
              }}
            >
              <div className="ml-1 h-full">{item.title}</div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        className="p-1 hover:bg-gray-200 rounded-2xl disabled:opacity-50"
        onClick={() => adjustFontSize(1)}
        disabled={props?.disabled}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default FontSizeMenuButton;
