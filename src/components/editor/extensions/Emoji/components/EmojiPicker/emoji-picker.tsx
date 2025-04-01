'use client';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import type * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const EmojiPicker = ({
  className,
  onEmojiSelect,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  onEmojiSelect?: (emoji: any) => void;
}) => {
  const [search, setSearch] = useState('');

  return (
    <div
      className={cn(
        'text-gray-800 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-lg shadow-lg border border-gray-200',
        className
      )}
      data-slot="emoji-picker"
      {...props}
    >
      <EmojiPickerContent onEmojiSelect={onEmojiSelect} search={search} />
    </div>
  );
};

const EmojiPickerContent = ({
  className,
  onEmojiSelect,
  search,
}: {
  className?: string;
  onEmojiSelect?: (emoji: any) => void;
  search: string;
}) => {
  return (
    <div className={cn('flex-1 overflow-y-auto', className)} data-slot="emoji-picker-viewport">
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        search={search}
        theme="light"
        skinTonePosition="search"
        previewPosition="none"
        className="w-full"
        emojiSize={24}
        perLine={9}
        navPosition="top"
        dynamicWidth={false}
      />
    </div>
  );
};

// Example usage with state management
const EmojiPickerWithFooter = ({ className }: { className?: string }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<any>(null);

  return (
    <div className={className}>
      <EmojiPicker onEmojiSelect={setSelectedEmoji} />
    </div>
  );
};

export { 
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerWithFooter
};