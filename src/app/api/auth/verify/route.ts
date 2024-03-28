import { cookies } from 'next/headers'

import { logout } from '@/lib/firebase/auth'
import { getCurrentUser, revokeAllSessions } from '@/lib/firebase-sdk/auth'
import { SESSION_KEY } from '@/lib/constant'

export const POST = async () => {
  const user = await getCurrentUser()

  if (user) {
    return Response.json({ status: true })
  }

  const sessionCookie = cookies().get(SESSION_KEY)?.value

  if (!sessionCookie) {
    return Response.json({ status: false, error: 'No session found' })
  }

  const result = await logout()

  if (!result) {
    return Response.json({ status: false, error: 'Fail to logout' })
  }

  cookies().delete(SESSION_KEY)

  await revokeAllSessions(sessionCookie)

  return Response.redirect('/auth/login')
}
