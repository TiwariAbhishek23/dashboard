// import type React from 'react';
import { useCallback } from 'react';

import { ActionButton, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { EmojiPicker } from './emoji-picker';

interface IProps {
  showClear?: boolean;
  onSelectEmoji: (emoji: string) => void;
  children: React.ReactNode;
}

function EmojiPickerWrap({ onSelectEmoji, children }: IProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>

      <PopoverContent 
        align="start"
        className="p-0 w-[350px]"
        hideWhenDetached
        side="bottom"
      >
        <EmojiPicker
          className="!h-[342px]"
          onEmojiSelect={(emojiData) => {
            onSelectEmoji(emojiData.native);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function EmojiPickerComponent({ editor, icon, ...props }: any) {
  const setEmoji = useCallback(
    (emoji: string) => {
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
        {...props}
      />
    </EmojiPickerWrap>
  );
}

export default EmojiPickerComponent;