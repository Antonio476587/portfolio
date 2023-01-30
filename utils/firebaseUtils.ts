import { db, FF, FS } from "./firebaseInitializer.ts";

const { getBlob, getBytes, getMetadata } = FS;
const { addDoc, collection, getDocs, getDoc, doc, Timestamp } = FF;

type message = {
  name: string;
  email: string;
  message: string;
};

async function getContent(
  ref: FS.StorageReference,
  typeOfContent: "media" | "text",
): Promise<[Blob | ArrayBuffer, FS.FullMetadata]> {
  if (typeOfContent == "media") {
    const blob: Blob = await getBlob(ref);
    const blobMetadata = await getMetadata(ref);
    return [blob, blobMetadata];
  } else {
    const data: ArrayBuffer = await getBytes(ref);
    const dataMetadata = await getMetadata(ref);
    return [data, dataMetadata];
  }
}

async function addMessage(message: message): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...message,
      date: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error(error);
  }
}

export { addMessage, getContent };
