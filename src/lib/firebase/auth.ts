import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/lib/firebase/config'

export const login = async (email: string, password: string) => {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password)
    const token = await userCreds.user.getIdToken()

    return token
  } catch (error) {
    return null
  }
}

export const logout = async () => {
  try {
    await auth.signOut()

    return true
  } catch (error) {
    return false
  }
}
