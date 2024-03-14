import {
  onSnapshot,
  collection,
  query,
  type DocumentData,
} from 'firebase/firestore'

import { db } from '@/lib/firebase/config'

export const getDocuments = (
  collectionName: string,
  cb: (doc: DocumentData) => void,
) => {
  const q = query(collection(db, collectionName))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach(cb)
  })

  return { unsubscribe }
}
