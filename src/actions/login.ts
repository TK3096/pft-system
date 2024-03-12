'use server'

import * as z from 'zod'
import { cookies } from 'next/headers'

import { LoginSchema } from '@/shcemas/auth'

import { login as loginWithFirebase } from '@/lib/firebase/auth'
import { createSessionCookie } from '@/lib/firebase-sdk/auth'
import { SESSION_KEY } from '@/lib/constant'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data
  const token = await loginWithFirebase(email, password)
  const expiresIn = 60 * 60 * 24 * 5 * 1000

  if (!token) {
    return { error: 'Fail to sign in' }
  }

  const sessionCookie = await createSessionCookie(token, { expiresIn })

  cookies().set(SESSION_KEY, sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  })

  return { success: true }
}
