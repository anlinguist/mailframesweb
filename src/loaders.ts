// loaders.ts
import { redirect } from 'react-router-dom';
import { auth } from './services/firebase';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { User } from 'firebase/auth';

export async function authLoader() {
  const user = auth.currentUser;

  if (user) {
    return null; // User is authenticated
  } else {
    // Wait for the auth state to initialize
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        if (user) {
          resolve(null);
        } else {
          reject(redirect('/'));
        }
      });
    });
  }
}


export const templatesLoader = async ({ request }: any, user: User | null) => {
  const db = getFirestore();
  const templatesRef = collection(db, 'templates');
  let templatesList = [];

  if (user) {
    const q = query(templatesRef, where('author', 'in', ['default', user.uid]));
    const querySnapshot = await getDocs(q);
    templatesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } else {
    const q = query(templatesRef, where('author', '==', 'default'));
    const querySnapshot = await getDocs(q);
    templatesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  const mfTemplates = templatesList.filter((template: any) => template.author === 'default');
  const userTemplates = templatesList.filter((template: any) => template.author !== 'default');

  return { mfTemplates, userTemplates };
};
