import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { logout } from '@/lib/firebase/auth'
import { getCurrentUser } from '@/lib/firebase-sdk/auth'
import { SESSION_KEY } from '@/lib/constant'

export const POST = async (req: NextRequest) => {
  const user = await getCurrentUser()

  if (user) {
    return NextResponse.json({ status: true })
  }

  const sessionCookie = cookies().get(SESSION_KEY)?.value

  if (!sessionCookie) {
    return NextResponse.json({ status: false })
  }

  await logout()
  cookies().delete(SESSION_KEY)

  return NextResponse.json({ status: false })
}
