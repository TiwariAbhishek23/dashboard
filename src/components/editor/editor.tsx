'use client';

import { useCallback, useState } from 'react'

import EditorFrame from '@/components/ui/EditorFrame'

import { SPECIAL_CHARACTERS } from '@/constants';

import { PencilLine, PencilOff, Volleyball } from 'lucide-react'

import { useRouter } from 'next/router';


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
  // AI,
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
  FontFamily.configure({ spacer: true }),
  FontSize.configure({ spacer: true }),
  Bold.configure({ spacer: true }),
  Italic,
  Underline,
  Strike,
  Color,
  Highlight,
  Link.configure({ spacer: true }),
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

  Blockquote.configure({ spacer: true }),
  HorizontalRule,
  TextDirection,
  SubAndSuperScript,
  FormatPainter.configure({ spacer: true }),
  Clear,
  SearchAndReplace,
  SlashCommand,
]

const DEFAULT = `I am abhishek`

const debounce = (func: any, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const Editor = ({contentHTML}) => {
  const [content, setContent] = useState(contentHTML)
  const [theme, setTheme] = useState('light')
  const [disable, setDisable] = useState(false)


  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value);
    }, 300),
    [],
  )


  //   const router = useRouter()

  // const handleTryItOut = () => {
  //   router.push('/playground')
  // }

  
  return (
    <div
      className="flex flex-col flex-grow h-screen overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-gray-200 bg-white dark:bg-gray-900">

        {/* Left: Edit/Preview Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setDisable(!disable)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition duration-200 cursor-pointer ${disable
              ? 'bg-amber-300 text-white hover:bg-amber-400'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {disable ? <PencilOff /> : <PencilLine />}
          </button>
        </div>

        {/* Center: Shortcut + Label Inputs */}
        <div className="flex flex-wrap items-center justify-center gap-4 flex-1 min-w-[200px]">
          {/* Shortcut */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Shortcut:</label>
            <div className="flex items-stretch border border-gray-300 rounded-md overflow-hidden dark:border-gray-600">
              <select
                defaultValue="/"
                className="bg-white dark:bg-gray-800 dark:text-white px-2 py-1 text-sm appearance-none focus:outline-none border-r border-gray-300 dark:border-gray-600 cursor-pointer"
              >
                {SPECIAL_CHARACTERS.map((char) => (
                  <option key={char} value={char}>
                    {char}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Type shortcut"
                className="px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Label */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Label:</label>
            <input
              type="text"
              placeholder="Enter label"
              className="px-2 py-1 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Right: Try It Out */}
        <div className="group relative inline-block">
          <button
            // onClick={handleTryItOut}
            className="p-2 bg-gray-100 text-gray-800 rounded-full shadow-sm ring-1 ring-gray-200 hover:bg-green-800 hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <Volleyball className="w-5 h-5" />
          </button>
        </div>
      </div>


      <EditorFrame
        output="html"
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={theme === 'dark'}
        disabled={disable}
      />
      {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
          }}
          readOnly
          value={content}
        />
      )}
    </div>

  )
}

export default Editor;
