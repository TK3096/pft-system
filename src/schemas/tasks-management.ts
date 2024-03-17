import * as z from 'zod'

import { TaskState } from '@/types'

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
})

export const EditWorkspaceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
})

export const CreateBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  workspaceId: z.string().min(1, 'Workspace id is required'),
})

export const EditBoardSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  workspaceId: z.string().min(1, 'Workspace id is required'),
  status: z.enum(['active', 'inactive']).default('active'),
})

export const CreateTaskSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  boardId: z.string().min(1, 'Board id is required'),
  state: z
    .enum([
      TaskState.TODO,
      TaskState.IN_PROGRESS,
      TaskState.REVIEW,
      TaskState.DONE,
    ])
    .default(TaskState.TODO),
  remarks: z.array(z.string()).optional(),
})
