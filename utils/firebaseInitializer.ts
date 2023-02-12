import { configAsync } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
await configAsync({ path: Deno.cwd() + "/.env", export: true });
import { initializeApp } from "https://esm.sh/firebase@9.16.0/app";
import {
  getAnalytics,
  logEvent,
} from "https://esm.sh/firebase@9.16.0/analytics";
import { getStorage } from "https://esm.sh/firebase@9.16.0/storage";
import { getFirestore } from "https://esm.sh/firebase@9.16.0/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Deno.env.get("FIREBASE_API_KEY"),
  authDomain: Deno.env.get("FIREBASE_AUTH_DOMAIN"),
  projectId: Deno.env.get("FIREBASE_PROJECT_ID"),
  storageBucket: Deno.env.get("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Deno.env.get("FIREBASE_MESSAGING_SENDER_ID"),
  appId: Deno.env.get("FIREBASE_APP_ID"),
  measurementId: Deno.env.get("FIREBASE_MEASUREMENT_ID"),
};

const app = initializeApp(firebaseConfig);

// Analytics
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");

// Storage
const storage = getStorage(app);

// DataBase
const db = getFirestore(app);

export { analytics, app, db, storage };
export * as F from "https://esm.sh/firebase@9.16.0/app";
export * as FA from "https://esm.sh/firebase@9.16.0/analytics";
export * as FS from "https://esm.sh/firebase@9.16.0/storage";
export * as FF from "https://esm.sh/firebase@9.16.0/firestore";
