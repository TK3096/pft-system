'use server'

import * as z from 'zod'

import { LoginSchema } from '@/shcemas/auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  // TODO - Implement login logic with firebase

  return { success: true }
}
