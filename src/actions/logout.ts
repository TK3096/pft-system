'use server'

import { cookies } from 'next/headers'

import { logout as logoutWithFirebase } from '@/lib/firebase/auth'
import { revokeAllSessions } from '@/lib/firebase-sdk/auth'
import { SESSION_KEY } from '@/lib/constant'

export const logout = async () => {
  const sessionCookie = cookies().get(SESSION_KEY)?.value

  if (!sessionCookie) {
    return { error: 'No session found' }
  }

  const result = await logoutWithFirebase()

  if (!result) {
    return { error: 'Fail to logout' }
  }

  cookies().delete(SESSION_KEY)

  await revokeAllSessions(sessionCookie)

  return { success: true }
}
