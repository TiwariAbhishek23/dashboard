'use client';

import { useCallback, useState } from 'react'

import EditorFrame from '@/components/ui/EditorFrame'
import ClipboardButton  from './plugins/Clipboard/button';

import {
  BaseKit,
  History,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Color,
  Emoji,
  FontFamily,
  FontSize,
  FormatPainter,
  Highlight,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  AI,
  LineHeight,
  Link,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  SubAndSuperScript,
  TextAlign,
  TextDirection,
  Underline,
} from '@/components/editor/extensions'

const convertBase64ToBlob = (base64: string) => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
  }),
  History,
  AI.configure({spacer: true}),
  FontFamily.configure({spacer: true}),
  FontSize.configure({ spacer: true }),
  Bold.configure({ spacer: true }),
  Italic,
  Underline,
  Strike,
  Color,
  Highlight,
  Link.configure({spacer: true}),
  Table,
  Emoji,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  BulletList,
  OrderedList,
  Indent,
  LineHeight,

  Blockquote.configure({spacer: true}),
  HorizontalRule,
  TextDirection,
  SubAndSuperScript,
  FormatPainter.configure({ spacer: true }),
  Clear,
  SearchAndReplace,
  SlashCommand,
]

const DEFAULT = ``

const debounce = (func: any, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const Editor = () => {
  const [content, setContent] = useState(DEFAULT)
  const [theme, setTheme] = useState('light')
  const [disable, setDisable] = useState(false)

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 300),
    [],
  )
  return (
    <div
      className="flex flex-col flex-grow h-screen overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg"
    >
      <EditorFrame
        output="html"
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={theme === 'dark'}
        disabled={disable}
      />
      {/* {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
          }}
          readOnly
          value={content}
        />
      )} */}
    </div>

  )
}

export default Editor;
