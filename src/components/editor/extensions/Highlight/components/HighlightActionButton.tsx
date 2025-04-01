'use client';

import React, { useCallback, useState } from 'react';

import type { TooltipContentProps } from '@radix-ui/react-tooltip';
import { debounce } from 'lodash-es';

import { ActionButton, Button, ColorPicker } from '@/components/ui';
import { IconComponent } from '@/assets/icons/Icon';
import type { ButtonViewReturnComponentProps } from '@/types/types';

interface IPropsHighlightActionButton {
  editor: any
  tooltip?: string
  disabled?: boolean
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
  tooltipOptions?: TooltipContentProps
  shortcutKeys?: string[]
}

const IconC = ({ fill }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-paint-bucket-icon"
    >
      <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" fill={fill || 'none'} />
      <path d="m5 2 5 5" fill={fill || 'none'} />
      <path d="M2 13h15" fill={fill || 'none'} />
      <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" fill={fill || 'none'} />
    </svg>

  );
}

const HighlightActionButton = (props: IPropsHighlightActionButton) => {
  // const { action, isActive, disabled, icon, tooltip } = props as any;
  const [selectedColor, setSelectedColor] = useState<any>(undefined);

  const onChange = (color: string | undefined) => {
    props.action?.(color);
  }

  const toggleColor = () => {
    props.action?.(selectedColor);
  }

  const setSelectedColorDebounce = useCallback(
    debounce((color: any) => {
      setSelectedColor(color);
    }, 350),
    [],
  );

  return (
    <div className="flex items-center h-[32px]">
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColorDebounce}
        onChange={onChange}
        highlight
        disabled={props?.disabled}
      >
        <Button variant="ghost" size="icon" className="w-[25px] h-[25px]" disabled={props?.disabled}>
        <span className="flex items-center justify-center text-sm">
          <IconC fill={selectedColor} />
        </span>
        </Button>
      </ColorPicker>
    </div>
  );
}

export default HighlightActionButton;
