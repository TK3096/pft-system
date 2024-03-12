import 'server-only'

import {
  cert,
  initializeApp,
  getApps,
  type ServiceAccount,
} from 'firebase-admin/app'

import { getAuth } from 'firebase-admin/auth'

const { privateKey } = JSON.parse(
  process.env.FIREBASE_SDK_PRIVATE_KEY as string,
)

const config = {
  credential: cert({
    type: process.env.FIREBASE_SDK_TYPE,
    projectId: process.env.FIREBASE_SDK_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_SDK_PRIVATE_KEY_ID,
    privateKey: privateKey,
    clientEmail: process.env.FIREBASE_SDK_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_SDK_CLIENT_ID,
    authUri: process.env.FIREBASE_SDK_AUTH_URI,
    tokenUri: process.env.FIREBASE_SDK_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_SDK_AUTH_PROVIDER,
    clientX509CertUrl: process.env.FIREBASE_SDK_CLIENT_CERT_URL,
    uniersalDomain: process.env.FIREBASE_SDK_UNIVERSAL_DOMAIN,
  } as ServiceAccount),
}

export const app = !getApps().length ? initializeApp(config) : getApps()[0]

export const auth = getAuth(app)
