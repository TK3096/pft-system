import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

export const app = !getApps().length ? initializeApp(config) : getApps()[0]

export const auth = getAuth(app)
