import { TaskState } from '@/types'

export const STORAGE_THEME_KEY = process.env.STORAGE_THEME_KEY as string

export const SESSION_KEY = process.env.SESSION_KEY as string

export const WORKSPACES_COLLECTION = 'workspaces'

export const BOARDS_COLLECTION = 'boards'

export const TASKS_COLLECTION = 'tasks'

export const PORTFOLIO_COLLECTION = 'portfolio'

export const TASK_STATES = [
  TaskState.TODO,
  TaskState.IN_PROGRESS,
  TaskState.REVIEW,
  TaskState.DONE,
]
