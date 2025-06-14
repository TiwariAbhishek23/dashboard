import type { TaskItemOptions } from '@tiptap/extension-task-item';
import { TaskItem } from '@tiptap/extension-task-item';
import type { TaskListOptions as TiptapTaskListOptions } from '@tiptap/extension-task-list';
import { TaskList as TiptapTaskList } from '@tiptap/extension-task-list';

import { ActionButton } from '@/components/ui';
import type { GeneralOptions } from '@/types/types';

/**
 * Represents the interface for task list options, extending TiptapTaskListOptions and GeneralOptions.
 */
export interface TaskListOptions extends TiptapTaskListOptions, GeneralOptions<TaskListOptions> {
  /** options for task items */
  taskItem: Partial<TaskItemOptions>
}

export const TaskList = TiptapTaskList.extend<TaskListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'task-list',
      },
      taskItem: {
        HTMLAttributes: {
          class: 'task-list-item',
        },
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleTaskList(),
          isActive: () => editor.isActive('taskList') || false,
          disabled: false,
          icon: 'ListTodo',
          shortcutKeys: ['shift', 'mod', '9'],
          tooltip: t('editor.tasklist.tooltip'),
        },
      }),
    };
  },

  addExtensions() {
    return [TaskItem.configure(this.options.taskItem)];
  },
});
