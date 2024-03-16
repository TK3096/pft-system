'use server'

import * as z from 'zod'

import {
  CreateWorkspaceSchema,
  EditWorkspaceSchema,
  CreateBoardSchema,
  EditBoardSchema,
} from '@/shcemas/tasks-management'

import { createTimestamp } from '@/lib/utils'
import { getCurrentUser } from '@/lib/firebase-sdk/auth'
import { add, update } from '@/lib/firebase-sdk/db'
import { BOARDS_COLLECTION, WORKSPACES_COLLECTION } from '@/lib/constant'

export const createWorkspace = async (
  values: z.infer<typeof CreateWorkspaceSchema>,
) => {
  const validatedFields = CreateWorkspaceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description } = validatedFields.data
  const user = await getCurrentUser()
  const timestamp = createTimestamp()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const id = await add(WORKSPACES_COLLECTION, {
    name,
    description,
    status: 'active',
    owner: user.uid,
    createdAt: timestamp,
    updatedAt: timestamp,
  })

  if (!id) {
    return { error: 'Fail to create workspace' }
  }

  return { success: id }
}

export const updateWorkspace = async (
  values: z.infer<typeof EditWorkspaceSchema>,
) => {
  const validatedFields = EditWorkspaceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { id, name, description, status } = validatedFields.data
  const user = await getCurrentUser()
  const timestamp = createTimestamp()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const updated = await update(WORKSPACES_COLLECTION, id, {
    name,
    description,
    status,
    updatedAt: timestamp,
  })

  if (!updated) {
    return { error: 'Fail to update workspace' }
  }

  return { success: true }
}

export const createBoard = async (
  values: z.infer<typeof CreateBoardSchema>,
) => {
  const validatedFields = CreateBoardSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description, workspaceId } = validatedFields.data
  const user = await getCurrentUser()
  const timestamp = createTimestamp()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const id = await add(BOARDS_COLLECTION, {
    name,
    description,
    workspaceId,
    status: 'active',
    owner: user.uid,
    createdAt: timestamp,
    updatedAt: timestamp,
  })

  if (!id) {
    return { error: 'Fail to create board' }
  }

  return { success: id }
}

export const updateBoard = async (values: z.infer<typeof EditBoardSchema>) => {
  const validatedFields = EditBoardSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { id, name, description, workspaceId, status } = validatedFields.data
  const user = await getCurrentUser()
  const timestamp = createTimestamp()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const updated = await update(BOARDS_COLLECTION, id, {
    name,
    description,
    workspaceId,
    status,
    updatedAt: timestamp,
  })

  if (!updated) {
    return { error: 'Fail to update board' }
  }

  return { success: true }
}
