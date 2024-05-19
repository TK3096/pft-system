import { TaskStatus } from '@/types'

export const STORAGE_THEME_KEY = process.env.STORAGE_THEME_KEY as string

export const SESSION_KEY = process.env.SESSION_KEY as string

export const PORTFOLIO_COLLECTION = 'portfolio'

export const TASK_BOARDS_COLLECTION = 'task-boards'

export const TASK_GROUPS_COLLECTION = 'task-groups'

export const TASKS_COLLECTION = 'tasks'

export const TASK_STATUS = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.TESTING,
  TaskStatus.DONE,
]
