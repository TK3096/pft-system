import 'server-only'

import { type DocumentData } from 'firebase-admin/firestore'

import { db } from '@/lib/firebase-sdk/config'

export const add = async (collection: string, data: DocumentData) => {
  try {
    const docRef = await db.collection(collection).add(data)

    return docRef.id
  } catch (error) {
    return null
  }
}
