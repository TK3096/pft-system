'use server'

import * as z from 'zod'

import {
  CreateTaskBoardSchema,
  CreateTaskGroupSchema,
  UpdateTaskBoardSchema,
  UpdateTaskGroupSchema,
} from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase-sdk/auth'
import { getCurrentDate } from '@/lib/utils'

import { taskBoards, taskGroups } from '@/mock-up-data'

export const createTaskBoard = async (
  values: z.infer<typeof CreateTaskBoardSchema>,
) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = CreateTaskBoardSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description } = validatedFields.data
  const date = getCurrentDate()

  const id = crypto.randomUUID()
  taskBoards.push({
    id: id,
    name,
    description,
    isDeleted: false,
    owner: user.uid,
    createdAt: date,
    updatedAt: date,
  })

  return { success: { id } }
}

export const updateTaskBoard = async (
  id: string,
  values: z.infer<typeof UpdateTaskBoardSchema>,
) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = UpdateTaskBoardSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description, isDeleted } = validatedFields.data
  const date = getCurrentDate()

  return { success: true }
}

export const createTaskGroup = async (
  values: z.infer<typeof CreateTaskGroupSchema>,
) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = CreateTaskGroupSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, boardId, description } = validatedFields.data
  const date = getCurrentDate()

  const id = crypto.randomUUID()
  taskGroups.push({
    id: id,
    name,
    description,
    boardId,
    isDeleted: false,
    owner: user.uid,
    createdAt: date,
    updatedAt: date,
  })

  return { success: { id } }
}

export const updateTaskGroup = async (
  id: string,
  values: z.infer<typeof UpdateTaskGroupSchema>,
) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = UpdateTaskGroupSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description, isDeleted, boardId } = validatedFields.data
  const date = getCurrentDate()

  return { success: true }
}
