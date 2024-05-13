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
