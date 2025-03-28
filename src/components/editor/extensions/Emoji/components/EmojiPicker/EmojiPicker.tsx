/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Clock3, Laugh } from 'lucide-react';

import { ActionButton, Popover, PopoverContent, PopoverTrigger, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import Activity from '@/assets/icons/Activity';
import Animal from '@/assets/icons/Animas';
import Flag from '@/assets/icons/Flag';
import Food from '@/assets/icons/Food';
import Object from '@/assets/icons/Object';
import Symbol from '@/assets/icons/Symbol';
import Travel from '@/assets/icons/Travel';
import { useLocale } from '@/locales';
import { createKeysLocalStorageLRUCache } from '@/utils/lru-cache';

import { ACTIVITIES, ANIMALS, EXPRESSIONES, FLAGS, FOODS, OBJECTS, SYMBOLS, TRAVELS } from './constants';

const emojiLocalStorageLRUCache = createKeysLocalStorageLRUCache('EMOJI_PICKER', 20);

const LIST = [
  {
    title: 'Smileys & People',
    data: EXPRESSIONES,
    icon: Laugh,
  },
  {
    title: 'Animals & Nature',
    data: ANIMALS,
    icon: Animal,
  },
  {
    title: 'Food & Drink',
    data: FOODS,
    icon: Food,
  },
  {
    title: 'Activity',
    data: ACTIVITIES,
    icon: Activity,
  },
  {
    title: 'Travel & Places',
    data: TRAVELS,
    icon: Travel,
  },
  {
    title: 'Object',
    data: OBJECTS,
    icon: Object,
  },
  {
    title: 'Symbol',
    data: SYMBOLS,
    icon: Symbol,
  },
  {
    title: 'Flags',
    data: FLAGS,
    icon: Flag,
  },
];

const RECENT_DEFAULT = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];

interface IProps {
  showClear?: boolean
  onSelectEmoji: (arg: string) => void
  children: React.ReactNode
}

function EmojiPickerWrap({ onSelectEmoji, children }: IProps) {
  const [recentUsed, setRecentUsed] = useState([]);
  const { t } = useLocale();

  const renderedList = useMemo(
    () => (recentUsed.length > 0
      ? [{ title: 'Frequently used', icon: Clock3, data: recentUsed }, ...LIST]
      : LIST),
    [recentUsed],
  );

  const selectEmoji = useCallback(
    (emoji: any) => {
      emojiLocalStorageLRUCache.put(emoji);
      // @ts-expect-error
      setRecentUsed(emojiLocalStorageLRUCache.get() as string[]);

      if (onSelectEmoji)
        onSelectEmoji(emoji);
    },
    [onSelectEmoji],
  );

  useEffect(() => {
    emojiLocalStorageLRUCache.syncFromStorage();
    const defaultEmoji = emojiLocalStorageLRUCache.get() as string[];

    if (!defaultEmoji?.length) {
      RECENT_DEFAULT.forEach((emoji) => {
        emojiLocalStorageLRUCache.put(emoji);
      });
    }

    const defaultEmojiNew = emojiLocalStorageLRUCache.get() as string[];
    setRecentUsed(defaultEmojiNew as any);
  }, []);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>

      <PopoverContent align="start"
        className="size-full p-2"
        hideWhenDetached
        side="bottom"
      >
        <Tabs defaultValue="Frequently used">
          <TabsList className="flex items-center gap-[4px]">
            {renderedList.map((list) => {
              return (
                <TabsTrigger
                  className="bg-accent !p-[6px] hover:text-accent-foreground"
                  key={`emoji-picker-title-${list.title}`}
                  value={list.title}
                >
                  {list.icon && <list.icon size={16} />}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {renderedList.map((list) => {
            return (
              <TabsContent
                key={`emoji-picker-content-${list.title}`}
                value={list.title}
              >
                <p className="mb-[6px] font-semibold">
                  {t(list.title as any)}
                </p>

                <div className="max-h-[280px] overflow-y-auto">
                  <div className="grid grid-cols-8 gap-1 ">
                    {(list.data || []).map(ex => (
                      <div
                        className="cursor-pointer text-center"
                        key={`emoji-picker-${ex}`}
                        onClick={() => selectEmoji(ex)}
                      >
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

export function EmojiPicker({ editor, icon, ...props }: any) {
  const setEmoji = useCallback(
    (emoji: any) => {
      const { selection } = editor.state;
      const { $anchor } = selection;
      return editor.chain().insertContentAt($anchor.pos, emoji).run();
    },
    [editor],
  );

  return (
    <EmojiPickerWrap onSelectEmoji={setEmoji}>
      <ActionButton
        icon={icon}
        tooltip={props?.tooltip}
      />
    </EmojiPickerWrap>
  );
}

export default EmojiPicker;
