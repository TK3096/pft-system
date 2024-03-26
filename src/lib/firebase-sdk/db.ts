import 'server-only'

import { type DocumentData } from 'firebase-admin/firestore'

import { db } from '@/lib/firebase-sdk/config'

export const list = async <T = object>(
  collection: string,
): Promise<T[] | null> => {
  try {
    const documents = await db.collection(collection).get()

    const data: T[] = documents.docs.map((doc) => {
      const document = doc.data() as T

      return { ...document, id: doc.id }
    })

    return data
  } catch (error) {
    return null
  }
}

export const get = async (collection: string, id: string) => {
  try {
    const document = await db.collection(collection).doc(id).get()

    return document
  } catch (error) {
    return null
  }
}

export const add = async (collection: string, data: DocumentData) => {
  try {
    const docRef = await db.collection(collection).add(data)

    return docRef.id
  } catch (error) {
    return null
  }
}

export const update = async (
  collection: string,
  id: string,
  data: DocumentData,
) => {
  try {
    await db.collection(collection).doc(id).update(data)

    return true
  } catch (error) {
    return null
  }
}
