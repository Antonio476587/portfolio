import type { APIRoute } from "astro";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields: name, email, or message" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (name.length < 2) {
      return new Response(JSON.stringify({ error: "Name must be at least 2 characters long" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (message.length < 10) {
      return new Response(JSON.stringify({ error: "Message must be at least 10 characters long" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const docRef = await addDoc(collection(db, "messages"), { nameMessage: name, email, message, date: Timestamp.now() });

    return new Response(JSON.stringify({ success: true, message: "Message sent successfully!", id: docRef.id }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ error: "Failed to process your message. Please try again later." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

// Handle OPTIONS for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
