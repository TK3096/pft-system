import { NextRequest, NextResponse } from 'next/server'

import { publicRotues, authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes'

import { SESSION_KEY } from '@/lib/constant'

const middleware = (req: NextRequest) => {
  const isLogedIn = !!req.cookies.get(SESSION_KEY)

  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)
  const isPublicRoute = publicRotues.includes(req.nextUrl.pathname)

  if (isAuthRoute) {
    if (isLogedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
    }

    return NextResponse.next()
  }

  if (!isLogedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

export default middleware
