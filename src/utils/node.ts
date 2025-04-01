import type { Editor } from '@tiptap/core';
import type { Node } from '@tiptap/pm/model';
import type { EditorState } from '@tiptap/pm/state';

export const isTitleNode = (node: Node): boolean => {
  return node && node.type.name === 'title';
}

export const isBulletListNode = (node: Node): boolean => {
  return node && node.type.name === 'bulletList';
}

export const isOrderedListNode = (node: Node): boolean => {
  return node && node.type.name === 'orderedList';
}

export const isTodoListNode = (node: Node): boolean => {
  return node && node.type.name === 'taskList';
}

export const isListNode = (node: Node): boolean => {
  return isBulletListNode(node) || isOrderedListNode(node) || isTodoListNode(node);
}

export const getCurrentNode = (state: EditorState): any => {
  const $head = state.selection.$head;
  let node = null;

  for (let d = $head.depth; d > 0; d--) {
    node = $head.node(d);
  }

  return node;
}

export const getNodeAtPos = (state: EditorState, pos: number): any => {
  const $head = state.doc.resolve(pos);
  let node = null;

  for (let d = $head.depth; d > 0; d--) {
    node = $head.node(d);
  }

  return node;
}

export const isInCustomNode = (state: EditorState, nodeName: string): boolean => {
  if (!state.schema.nodes[nodeName])
    return false;

  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--) {
    if ($head.node(d).type === state.schema.nodes[nodeName]) {
      return true;
    }
  }
  return false;
}

export const isInCodeBlock =(state: EditorState): boolean => {
  return isInCustomNode(state, 'codeBlock');
}

export const isInTitle = (state: EditorState): boolean => {
  if (state?.selection?.$head?.pos === 0)
    return true;
  return isInCustomNode(state, 'title');
}

export const isInCallout = (state: EditorState): boolean => {
  return isInCustomNode(state, 'callout');
}

export const findNode = (editor: Editor, name: string) => {
  const content = editor.getJSON();
  const queue = [content];
  const res = [];

  while (queue.length > 0) {
    const node = queue.shift() as any;

    if (node.type === name) {
      res.push(node);
    }

    if (node.content && node.content.length > 0) {
      queue.push(...node.content);
    }
  }

  return res;
}
