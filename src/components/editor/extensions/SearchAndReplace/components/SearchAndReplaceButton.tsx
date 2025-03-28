'use client';

import React, { useEffect, useState } from 'react';
import deepEqual from 'deep-equal';
import { ActionButton, Button, Input, Label, Popover, PopoverContent, PopoverTrigger, Switch } from '@/components/ui';
import { IconComponent } from '@/assets/icons';
import { useLocale } from '@/locales';
import { ON_SEARCH_RESULTS, SearchAndReplace } from '@/components/editor/extensions/SearchAndReplace/SearchAndReplace';

function SearchAndReplaceButton({ editor, ...props }: any) {
  const { t } = useLocale();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    if (!visible) {
      setSearchValue('');
      setReplaceValue('');
      setCurrentIndex(-1);
      setResults([]);

      editor.commands.setSearchTerm('');
      editor.commands.setReplaceTerm('');
    }
  }, [editor, visible]);

  useEffect(() => {
    if (!visible)
      return;
    if (editor && editor.commands && editor.commands.setSearchTerm) {
      editor.commands.setSearchTerm(searchValue);
    }
  }, [visible, searchValue, editor]);

  useEffect(() => {
    if (!visible)
      return;
    if (editor && editor.commands && editor.commands.setReplaceTerm) {
      editor.commands.setReplaceTerm(replaceValue);
    }
  }, [visible, replaceValue, editor]);

  useEffect(() => {
    if (!editor)
      return;

    const searchExtension = editor.extensionManager.extensions.find((ext: any) => ext.name === SearchAndReplace.name);

    if (!searchExtension)
      return;

    const listener = () => {
      if (!visible)
        return;

      const currentIndex = searchExtension ? searchExtension.storage.currentIndex : -1;
      const results = searchExtension ? searchExtension.storage.results : [];
      setCurrentIndex(preIndex => (preIndex !== currentIndex ? currentIndex : preIndex));
      setResults(prevResults => (deepEqual(prevResults, results) ? prevResults : results));
    };

    window.addEventListener(ON_SEARCH_RESULTS, listener);

    return () => {
      if (!searchExtension)
        return;
      window.removeEventListener(ON_SEARCH_RESULTS, listener);
    };
  }, [visible, editor]);

  return (
    <Popover
      open={visible}
      onOpenChange={setVisible}
    >
      <PopoverTrigger
        disabled={props?.disabled}
        asChild
      >
        <ActionButton
          tooltip={props?.tooltip}
          isActive={props?.isActive}
          disabled={props?.disabled}
        >
          <IconComponent name={props?.icon} />
        </ActionButton>
      </PopoverTrigger>
      <PopoverContent
        hideWhenDetached
        className="w-full"
        align="start"
        side="bottom"
      >

        <div className="mb-[6px] flex items-center justify-between">
          <Label>
            {t('editor.search.dialog.text')}
          </Label>
          <span className="font-semibold">
            {results.length > 0 ? `${currentIndex + 1}/${results.length}` : '0/0'}
          </span>
        </div>
        <div className="flex w-full max-w-sm items-center gap-1.5 mb-[10px]">
          <Input
            type="text"
            required
            className="w-full"
            placeholder="Text"
            autoFocus
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />

          <Button disabled={results.length === 0} className="flex-1" onClick={editor.commands.goToPrevSearchResult}>
            <IconComponent name="ChevronUp" />
          </Button>

          <Button disabled={results.length === 0} className="flex-1" onClick={editor.commands.goToNextSearchResult}>
            <IconComponent name="ChevronDown" />
          </Button>

        </div>
        <Label className="mb-[6px]">
          {t('editor.replace.dialog.text')}
        </Label>
        <div className="flex w-full max-w-sm items-center gap-1.5 mb-[5px]">
          <div className="relative items-center w-full max-w-sm">
            <Input
              type="text"
              required
              className="w-80"
              placeholder="Text"
              value={replaceValue}
              onChange={e => setReplaceValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-[10px]">
          <Switch
            checked={caseSensitive}
            onCheckedChange={(e: any) => {
              setCaseSensitive(e);
              editor.commands.setCaseSensitive(e);
            }}
          />
          <Label>
            {t('editor.replace.caseSensitive')}
          </Label>
        </div>

        <div className="flex items-center gap-[10px]">
          <Button disabled={results.length === 0} className="flex-1" onClick={editor.commands.replace}>
            {t('editor.replace.dialog.text')}
          </Button>

          <Button disabled={results.length === 0} className="flex-1" onClick={editor.commands.replaceAll}>
            {t('editor.replaceAll.dialog.text')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SearchAndReplaceButton;
