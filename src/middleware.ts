import { NextRequest, NextResponse } from 'next/server'

const middleware = (req: NextRequest) => {
  // TODO - implement middleware logic (public/private routes, etc.)

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

export default middleware
