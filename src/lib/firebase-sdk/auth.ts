import 'server-only'

import { cookies } from 'next/headers'
import { type SessionCookieOptions } from 'firebase-admin/auth'

import { auth } from '@/lib/firebase-sdk/config'

import { SESSION_KEY } from '@/lib/constant'

export const getSession = async () => {
  try {
    return cookies().get(SESSION_KEY)?.value
  } catch (error) {
    return undefined
  }
}

export const isUserAuthenticated = async (session?: string) => {
  const __session = session ?? (await getSession())

  if (!__session) {
    return false
  }

  try {
    const isRevoked = !(await auth.verifySessionCookie(__session, true))

    return !isRevoked
  } catch (error) {
    return false
  }
}

export const getCurrentUser = async () => {
  const session = await getSession()

  const isAuth = await isUserAuthenticated(session)
  if (!isAuth) {
    return null
  }

  const decodedToken = await auth.verifySessionCookie(session!)
  const currentUser = await auth.getUser(decodedToken.uid)

  return currentUser
}

export const createSessionCookie = async (
  token: string,
  options: SessionCookieOptions,
) => {
  return auth.createSessionCookie(token, options)
}

export const revokeAllSessions = async (session: string) => {
  const decodedToken = await auth.verifySessionCookie(session)

  return await auth.revokeRefreshTokens(decodedToken.uid)
}
