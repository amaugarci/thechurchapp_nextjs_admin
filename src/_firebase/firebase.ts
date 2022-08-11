import { Auth, getAuth, User } from '@firebase/auth';
import { Firestore, getFirestore } from '@firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { firebaseConfig } from '../utils/app_constants';

let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics;

export async function initializeFirebase(): Promise<boolean> {
  if (getApps.length !== 0) return false;

  const app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth();
  db = getFirestore();
  storage = getStorage();

  return Promise.resolve(true);
}

export async function listenAuthStateChange(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export { auth, db, storage, analytics };
