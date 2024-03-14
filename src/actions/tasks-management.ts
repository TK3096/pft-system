'use server'

import * as z from 'zod'

import { CreateWorkspaceSchema } from '@/shcemas/tasks-management'

import { createTimestamp } from '@/lib/utils'
import { getCurrentUser } from '@/lib/firebase-sdk/auth'
import { add } from '@/lib/firebase-sdk/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'

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
