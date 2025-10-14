import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : undefined,
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { app, db };
