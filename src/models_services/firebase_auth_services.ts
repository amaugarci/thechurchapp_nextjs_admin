import { auth } from '../_firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User, sendPasswordResetEmail } from 'firebase/auth';

export async function signinWithEmail(email: string, password: string): Promise<User | null> {
  email.trim().toLowerCase();
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(email: string): Promise<boolean> {
  email.trim().toLowerCase();

  try {
    const res = await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
}

export async function createUserWithEmail(email: string, password: string): Promise<User | undefined> {
  email.trim().toLowerCase();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) {
      return res.user;
    }
  } catch (error) {
    throw error;
  }
}

export function getFirebaseCurrentUser(): User | null {
  try {
    const user = auth.currentUser;
    return user;
  } catch (error) {
    return null;
  }
}

export async function signOut(): Promise<void> {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
}
