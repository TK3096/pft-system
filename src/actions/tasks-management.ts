'use server'

import * as z from 'zod'

import {
  CreateTaskBoardSchema,
  CreateTaskGroupSchema,
  UpdateTaskBoardSchema,
  UpdateTaskGroupSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
} from '@/schemas/tasks-management'

import { getCurrentUser } from '@/lib/firebase-sdk/auth'
import { getCurrentDate } from '@/lib/utils'

import { taskBoards, taskGroups, tasks } from '@/mock-up-data'

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

export const createTask = async (values: z.infer<typeof CreateTaskSchema>) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = CreateTaskSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { groupId, name, description, status, remarks, tag } =
    validatedFields.data
  const date = getCurrentDate()

  const id = crypto.randomUUID()
  tasks.push({
    id: id,
    tag,
    name,
    description,
    groupId,
    status,
    remarks,
    isDeleted: false,
    owner: user.uid,
    createdAt: date,
    updatedAt: date,
  })

  return { success: { id } }
}

export const updateTask = async (
  id: string,
  values: z.infer<typeof UpdateTaskSchema>,
) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = UpdateTaskSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { groupId, name, description, status, remarks, tag, isDeleted } =
    validatedFields.data
  const date = getCurrentDate()

  return { success: true }
}