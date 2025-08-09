import { configAsync } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
await configAsync({ path: Deno.cwd() + "/.env", export: true });
import {
  getAnalytics,
  logEvent,
  isSupported,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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
export * as F from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
export * as FA from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
export * as FS from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
export * as FF from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
