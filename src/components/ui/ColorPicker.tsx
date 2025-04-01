'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Eraser } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Separator } from '@/components/ui';
import { COLORS_LIST as DEFAULT_COLORS_LIST } from '@/constants';
import { useLocale } from '@/locales';

export interface ColorPickerProps {
  highlight?: boolean;
  disabled?: boolean;
  colors?: string[];
  defaultColor?: string;
  children: React.ReactNode;
  onChange?: (color: string | undefined) => void;
  setSelectedColor?: (color: string | undefined) => void;
  selectedColor?: string;
}

function ColorPicker(props: ColorPickerProps) {
  const { t } = useLocale();
  const {
    highlight = false,
    disabled = false,
    selectedColor,
    setSelectedColor,
    onChange,
    colors = DEFAULT_COLORS_LIST,
  } = props;

  const chunkedColors = useMemo(() => {
    const colorsArray = colors;
    const chunked: string[][] = [];
    for (let i = 0; i < colorsArray.length; i += 10) {
      chunked.push(colorsArray.slice(i, i + 10));
    }
    return chunked;
  }, [colors]);

  const [recentColorsStore, setRecentColorsStore] = useState<string[]>([]);

  const setRecentColor = (color: string) => {
    const newRecentColors = [...recentColorsStore];
    const index = newRecentColors.indexOf(color);
    if (index !== -1) {
      newRecentColors.splice(index, 1);
    }
    newRecentColors.unshift(color);
    if (newRecentColors.length > 5) { // Reduced to 5 for compactness
      newRecentColors.pop();
    }
    setRecentColorsStore(newRecentColors);
  };

  function setColor(color: string | undefined) {
    if (color === undefined) {
      setSelectedColor?.(color);
      onChange?.(color);
      return;
    }
    const isCorrectColor = /^#([\da-f]{3}){1,2}$/i.test(color);
    if (isCorrectColor) {
      setSelectedColor?.(color);
      onChange?.(color);
      setRecentColor(color);
    }
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild className="!p-0" disabled={disabled}>
        {props?.children}
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-2 dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700"
        hideWhenDetached
        side="bottom"
      >
        <div className="flex flex-col">
          {/*No Fill / Default Option */}
          <div
            className="flex items-center gap-1 p-3 m-1 rounded transition-colors cursor-pointer hover:bg-gray-100"
            onClick={() => setColor(undefined)}
          >
            <Eraser className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-700 dark:text-gray-200">
              Clear
            </span>
          </div>

          {/* Preset Colors */}
          <div className="grid grid-cols-10 pr-2">
            {chunkedColors.flat().map((item, idx) => (
              <div
                key={`color-${idx}`}
                className="relative w-6 h-6 m-2 rounded-full cursor-pointer transition-transform hover:scale-105"
                onClick={() => setColor(item)}
                style={{ backgroundColor: item }}
              >
                {item === selectedColor && (
                  <svg
                    className="absolute inset-0 m-auto w-3 h-3 text-white drop-shadow-sm"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Recent Colors */}
          {recentColorsStore.length > 0 && (
            <div className='my-2'>
              <Separator className="my-1 bg-gray-200 dark:bg-gray-600" />
              <div className="text-xs font-medium my-2 text-gray-600 dark:text-gray-300">
                {t('editor.recent')}
              </div>
              <div className="grid grid-cols-5 gap-1">
                {recentColorsStore.map((item, idx) => (
                  <div
                    key={`recent-${idx}`}
                    className="relative w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setColor(item)}
                    style={{ backgroundColor: item }}
                  >
                    {item === selectedColor && (
                      <svg
                        className="absolute inset-0 m-auto w-3 h-3 text-white drop-shadow-sm"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add More Color */}
          <AddMoreColor setColor={setColor} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface AddMoreColorProps {
  setColor: (color: string) => void;
}

function AddMoreColor({ setColor }: AddMoreColorProps) {
  const [colorMore, setColorMore] = useState('#000000');
  const [openColorMore, setOpenColorMore] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    return () => setOpenColorMore(false);
  }, []);

  return (
    <Popover open={openColorMore}>
      <PopoverTrigger asChild>
        <div
          className="flex items-center gap-1 p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer text-xs text-gray-700 dark:text-gray-200"
          onClick={(e) => {
            e.preventDefault();
            setOpenColorMore(true);
          }}
        >
          <Plus className="w-4 h-4" />
          {t('editor.color.more')}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-3 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <HexColorPicker
            color={colorMore}
            onChange={setColorMore}
            className="w-full rounded shadow-sm"
          />
          <div className="flex items-center gap-2">
            <Input
              className="w-full h-8 text-xs bg-gray-100 dark:bg-gray-700 border-none focus:ring-1 focus:ring-blue-500 rounded"
              type="text"
              value={colorMore.slice(1)}
              onChange={(e) => setColorMore(`#${e.target.value}`)}
            />
            <div
              className="w-6 h-6 rounded shadow-sm"
              style={{ backgroundColor: colorMore }}
            />
          </div>
          <Button
            className="h-8 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setColor(colorMore);
              setOpenColorMore(false);
            }}
          >
            <Plus className="w-3 h-3 mr-1" />
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ColorPicker };