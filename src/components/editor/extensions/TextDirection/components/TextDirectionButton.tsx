'use client';

import React, { useMemo } from 'react';

import { ActionButton } from '@/components/ui';
import { IconComponent } from '@/assets/icons';
import { Popover, PopoverContent, PopoverTrigger, Toggle, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import type { ButtonViewReturnComponentProps } from '@/types/types';
import { getShortcutKey } from '@/utils/plateform';

export interface Item {
  title: string
  icon?: any
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  shortcutKeys?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}
interface IPropsTextDirectionButton {
  editor: any
  disabled?: boolean
  color?: string
  maxHeight?: string | number
  icon?: any
  tooltip?: string
  items?: Item[]
}

const TextDirectionButton = (props: IPropsTextDirectionButton) => {
  const active = useMemo(() => {
    const find: any = props?.items?.find((k: any) => k.isActive());
    if (find && !find.default) {
      return {
        ...find,
        icon: find.icon ? find.icon : props.icon,
      };
    }
    const item: Item = {
      title: props?.tooltip as any,
      icon: props.icon,
      isActive: () => false,
    };

    return item;
  }, [props]);

  return (
    <Popover modal>
      <PopoverTrigger asChild
        disabled={props?.disabled}
      >
        <ActionButton
          disabled={props?.disabled}
          icon={props?.icon}
          tooltip={props?.tooltip}
        >
          <IconComponent className="ml-1 size-3 text-zinc-500"
            name="MenuDown"
          />
        </ActionButton>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="flex w-full min-w-4 flex-row gap-1 !p-[4px]"
        side="bottom"
      >
        {props?.items?.map((item, index) => {
          return (
                <Toggle
                  className="size-7 p-1"
                  data-state={active.title === item.title ? 'on' : 'off'}
                  onClick={item?.action}
                  pressed={active.title === item.title}
                  size="sm"
                >
                  {item?.icon && <IconComponent name={item.icon} />}
                </Toggle>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export default TextDirectionButton;
