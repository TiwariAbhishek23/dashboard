import { deleteSelection } from '@tiptap/pm/commands';
import type { Editor } from '@tiptap/react';

import { ActionButton } from '@/components/ui';
import { BUBBLE_TEXT_LIST, IMAGE_SIZE } from '@/constants';
import { localeActions } from '@/locales';
import type { ButtonViewParams, ButtonViewReturn, ExtensionNameKeys } from '@/types/types';

/** Represents the size types for bubble images or videos */
type BubbleImageOrVideoSizeType = 'size-small' | 'size-medium' | 'size-large';
type ImageAlignments = 'left' | 'center' | 'right';

/** Represents the various types for bubble images */
type BubbleImageType =
  | `image-${BubbleImageOrVideoSizeType}`
  | `video-${BubbleImageOrVideoSizeType}`
  | 'image'
  | 'image-aspect-ratio'
  | 'remove';

/** Represents the types for bubble videos */
type BubbleVideoType = 'video' | 'remove';

/** Represents the overall types for bubbles */
type BubbleAllType =
  | BubbleImageType
  | BubbleVideoType
  | ExtensionNameKeys
  | 'divider'
  | (string & {});

/** Represents the key types for node types */
export type NodeTypeKey = 'image' | 'text' | 'video';

/** Represents the menu of bubble types for each node type */
export type BubbleTypeMenu = Partial<Record<NodeTypeKey, BubbleMenuItem[]>>;

/** Represents the menu of overall bubble types for each node type */
export type NodeTypeMenu = Partial<Record<NodeTypeKey, BubbleAllType[]>>;

/**
 * Represents the structure of a bubble menu item.
 */
export interface BubbleMenuItem extends ButtonViewReturn {
  /** The type of the bubble item */
  type: BubbleAllType
}

/**
 * Represents a function to generate a bubble menu
 */
/**
   * Generates a bubble menu based on the provided options.
   * @param {ButtonViewParams<T>} options - The options for generating the bubble menu.
   * @returns {BubbleTypeMenu} The generated bubble menu.
   */
type BubbleView<T = any> = (options: ButtonViewParams<T>) => BubbleTypeMenu;

/**
 * Represents the options for configuring bubbles.
 * @interface BubbleOptions
 * @template T
 */
export interface BubbleOptions<T> {
  /** The menu of bubble types for each node type. */
  list: NodeTypeMenu
  /** The default list of bubble types. */
  defaultBubbleList: any
  /** The function to generate a bubble menu. */
  button: BubbleView<T>
}

function imageSizeMenus(editor: Editor): BubbleMenuItem[] {
  const types: BubbleImageOrVideoSizeType[] = ['size-small', 'size-medium', 'size-large'];
  const icons: NonNullable<ButtonViewReturn['componentProps']['icon']>[] = [
    'SizeS',
    'SizeM',
    'SizeL',
  ];

  return types.map((size, i) => ({
    type: `image-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: localeActions.t(`editor.${size.replace('-', '.')}.tooltip` as any),
      icon: icons[i],
      action: () => editor.commands.updateImage({ width: IMAGE_SIZE[size] }),
      isActive: () => editor.isActive('image', { width: IMAGE_SIZE[size] }),
    },
  }));
}

function imageAlignMenus(editor: Editor): BubbleMenuItem[] {
  const types: ImageAlignments[] = ['left', 'center', 'right'];
  const iconMap: any = {
    left: 'AlignLeft',
    center: 'AlignCenter',
    right: 'AlignRight',
  };
  return types.map(k => ({
    type: `image-${k}`,
    component: ActionButton,
    componentProps: {
      tooltip: localeActions.t(`editor.textalign.${k}.tooltip`),
      icon: iconMap[k],
      action: () => editor.commands?.setAlignImage?.(k),
      isActive: () => editor.isActive({ align: k }) || false,
      disabled: false,
    },
  }));
}
export function getBubbleImage(editor: Editor): BubbleMenuItem[] {
  return [
    {
      type: 'flipX',
      component: ActionButton,
      componentProps: {
        editor,
        tooltip: localeActions.t('editor.tooltip.flipX'),
        icon: 'FlipX',
        action: () => {
          const image = editor.getAttributes('image');
          const { flipX } = image as any;
          editor
            .chain()
            .focus(undefined, { scrollIntoView: false })
            .updateImage({
              flipX: !flipX,
            })
            .run();
        },
      },
    },
    {
      type: 'flipY',
      component: ActionButton,
      componentProps: {
        editor,
        tooltip: localeActions.t('editor.tooltip.flipY'),
        icon: 'FlipY',
        action: () => {
          const image = editor.getAttributes('image');
          const { flipY } = image as any;
          editor
            .chain()
            .focus(undefined, { scrollIntoView: false })
            .updateImage({
              flipY: !flipY,
            })
            .run();
        },
      },
    },
    ...imageSizeMenus(editor),
    ...imageAlignMenus(editor),
    {
      type: 'remove',
      component: ActionButton,
      componentProps: {
        editor,
        tooltip: localeActions.t('editor.remove'),
        icon: 'Trash2',
        action: () => {
          const { state, dispatch } = editor.view;
          deleteSelection(state, dispatch);
        },
      },
    },
  ];
}


/**
 * Bubble menu text list
 */
export function getBubbleText(editor: Editor, t: any) {
  return BUBBLE_TEXT_LIST.reduce((acc, type) => {
    if (type === 'divider' && acc.length > 0) {
      return [...acc, {
        type: 'divider',
        component: undefined,
        componentProps: {},
      }];
    }

    const ext = editor.extensionManager.extensions.find(ext => ext.name === type);
    if (ext) {
      return [...acc, ext.configure().options.button({ editor, t, extension: ext })];
    }

    return acc;
  }, [] as BubbleMenuItem[]);
}
