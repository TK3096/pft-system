import { NextRequest, NextResponse } from 'next/server'

import { add } from '@/lib/firebase-sdk/db'
import { TaskBoard } from '@/types'

export const POST = async (req: NextRequest) => {
  const reqBody = (await req.json()) as TaskBoard

  await add('tasks', reqBody)

  return NextResponse.json({ success: true })
}
