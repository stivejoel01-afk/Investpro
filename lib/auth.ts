import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { auth, db } from './firebase'
import { UserData } from '@/types/index'
import { generateReferralCode } from './utils'

// Sign up
export const signUp = async (
  email: string,
  password: string,
  fullName: string,
  phone: string,
  referralCode?: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    // Check if referral code is valid
    let referrerUid = null
    if (referralCode) {
      const q = query(
        collection(db, 'users'),
        where('referralCode', '==', referralCode)
      )
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        referrerUid = querySnapshot.docs[0].id
      }
    }

    // Create user document
    const newReferralCode = generateReferralCode()
    const userData: UserData = {
      uid: user.uid,
      fullName,
      email,
      phone,
      balance: 0,
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalRevenue: 0,
      referralCode: newReferralCode,
      referralBonus: 0,
      referrals: [],
      kycStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      blocked: false,
    }

    await setDoc(doc(db, 'users', user.uid), userData)

    // Add referral if valid
    if (referrerUid) {
      const referrerRef = doc(db, 'users', referrerUid)
      const referrerData = (await getDoc(referrerRef)).data() as UserData
      await setDoc(
        referrerRef,
        {
          referrals: [...(referrerData.referrals || []), user.uid],
          referralBonus: (referrerData.referralBonus || 0) + 500,
        },
        { merge: true }
      )
    }

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign in
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign out
export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Get user data
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserData
    }
    return null
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Monitor auth state
export const setupAuthListener = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback)
}
