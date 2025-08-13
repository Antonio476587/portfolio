// In a separate initialization file or at the top of your backend entry point
import { cert, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Replace with the path to your service account key file
const serviceAccount = import(
  "../../../portfolio-personal-df7a4-firebase-adminsdk-rfxhm-20aab13fb5.json"
);

initializeApp({
  credential: cert(serviceAccount),
  // Replace with your storage bucket name (e.g., 'your-project-id.appspot.com')
  storageBucket: "portfolio-personal-df7a4.appspot.com",
});

export const adminStorage = getStorage();
