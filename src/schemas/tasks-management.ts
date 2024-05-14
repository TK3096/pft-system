import { TaskStatus } from '@/types'

import * as z from 'zod'

export const CreateTaskBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
})

export const UpdateTaskBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  isDeleted: z.boolean().default(false),
})

export const CreateTaskGroupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  boardId: z.string().min(1, 'Board ID is required'),
  description: z.string(),
})

export const UpdateTaskGroupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  boardId: z.string().min(1, 'Board ID is required'),
  description: z.string(),
  isDeleted: z.boolean().default(false),
})

export const CreateTaskSchema = z.object({
  tag: z.string().min(1, 'Tag is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  groupId: z.string().min(1, 'Group ID is required'),
  status: z.enum([
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
    TaskStatus.TESTING,
  ]),
  remarks: z.array(z.string()),
})
