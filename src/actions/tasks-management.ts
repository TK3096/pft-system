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

import { add, update } from '@/lib/firebase-sdk/db'
import { getCurrentUser } from '@/lib/firebase-sdk/auth'
import { getCurrentDate } from '@/lib/utils'
import {
  TASK_BOARDS_COLLECTION,
  TASK_GROUPS_COLLECTION,
  TASKS_COLLECTION,
} from '@/lib/constant'

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

  const id = await add(TASK_BOARDS_COLLECTION, {
    name,
    description,
    isDeleted: false,
    owner: user.uid,
    createdAt: date,
    updatedAt: date,
  })

  if (!id) {
    return { error: 'Failed to create task board' }
  }

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

  const updated = await update(TASK_BOARDS_COLLECTION, id, {
    name,
    description,
    isDeleted,
    updatedAt: date,
  })

  if (!updated) {
    return { error: 'Failed to update task board' }
  }

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

  const id = await add(TASK_GROUPS_COLLECTION, {
    name,
    boardId,
    description,
    isDeleted: false,
    owner: user.uid,
    createdAt: date,
    updatedAt: date,
  })

  if (!id) {
    return { error: 'Failed to create task group' }
  }

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

  const updated = await update(TASK_GROUPS_COLLECTION, id, {
    name,
    description,
    isDeleted,
    boardId,
    updatedAt: date,
  })

  if (!updated) {
    return { error: 'Failed to update task group' }
  }

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

  const { groupId, name, description, status, remarks, tag, boardId } =
    validatedFields.data
  const date = getCurrentDate()

  const id = await add(TASKS_COLLECTION, {
    boardId,
    groupId,
    name,
    description,
    status,
    remarks,
    tag,
    isDeleted: false,
    owner: user.uid,
    createdAt: date,
    updatedAt: date,
  })

  if (!id) {
    return { error: 'Failed to create task' }
  }

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

  const {
    groupId,
    name,
    description,
    status,
    remarks,
    tag,
    isDeleted,
    boardId,
  } = validatedFields.data
  const date = getCurrentDate()

  const updated = await update(TASKS_COLLECTION, id, {
    boardId,
    groupId,
    name,
    description,
    status,
    remarks,
    tag,
    isDeleted,
    updatedAt: date,
  })

  if (!updated) {
    return { error: 'Failed to update task' }
  }

  return { success: true }
}
