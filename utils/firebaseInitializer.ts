import { configAsync } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
await configAsync({ path: Deno.cwd() + "/.env", export: true });
import { initializeApp } from "firebase/app.js";
import {
  getAnalytics,
  logEvent,
  isSupported,
} from "firebase/analytics.js";
import { getStorage } from "firebase/storage.js";
import { getFirestore } from "firebase/firestore.js";

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
let analytics;
if (await isSupported()) {
  console.log("supported");
  analytics = getAnalytics(app);
  logEvent(analytics, "notification_received");
} else {
  console.warn("not supported");
  analytics = null
}

// Storage
const storage = getStorage(app);

// DataBase
const db = getFirestore(app);

export { analytics, app, db, storage };
export * as F from "firebase/app.js";
export * as FA from "firebase/analytics.js";
export * as FS from "firebase/storage.js";
export * as FF from "firebase/firestore.js";
