// loaders.ts
import { redirect } from 'react-router-dom';
import { auth } from './services/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

export const templatesLoader = async () => {
  const db = getFirestore();
  const templatesData: any[] = [];

  const defaultTemplatesSnapshot = await getDocs(collection(db, 'templates'));
  defaultTemplatesSnapshot.forEach((doc) => {
    templatesData.push({ id: doc.id, ...doc.data(), isUserTemplate: false });
  });

  return { templates: templatesData };
};