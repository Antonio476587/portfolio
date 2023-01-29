import { config } from "https://deno.land/x/dotenv/mod.ts";
config({ path: Deno.cwd() + "/.env", export: true });
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import {  getStorage } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: Deno.env.get("FIREBASE_API_KEY"),
  authDomain: Deno.env.get("FIREBASE_AUTH_DOMAIN"),
  projectId: Deno.env.get("FIREBASE_PROJECT_ID"),
  storageBucket: Deno.env.get("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Deno.env.get("FIREBASE_MESSAGING_SENDER_ID"),
  appId: Deno.env.get("FIREBASE_APP_ID"),
  measurementId: Deno.env.get("FIREBASE_MEASUREMENT_ID"),
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

const storage = getStorage(app);

export {
    app,
    analytics,
    storage
}
export * from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
export * from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
export * from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";