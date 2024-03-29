import { configAsync } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
await configAsync({ path: Deno.cwd() + "/.env", export: true });
import { initializeApp } from "https://esm.sh/v106/firebase@9.16.0/deno/app.js";
import {
  getAnalytics,
  logEvent,
  isSupported,
} from "https://esm.sh/v106/firebase@9.16.0/deno/analytics.js";
import { getStorage } from "https://esm.sh/v106/firebase@9.16.0/deno/storage.js";
import { getFirestore } from "https://esm.sh/v106/firebase@9.16.0/deno/firestore.js";

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
export * as F from "https://esm.sh/v106/firebase@9.16.0/deno/app.js";
export * as FA from "https://esm.sh/v106/firebase@9.16.0/deno/analytics.js";
export * as FS from "https://esm.sh/v106/firebase@9.16.0/deno/storage.js";
export * as FF from "https://esm.sh/v106/firebase@9.16.0/deno/firestore.js";
