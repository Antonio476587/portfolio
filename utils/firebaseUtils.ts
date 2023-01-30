import { FS, FF, db } from "./firebaseInitializer.ts";

const {getBlob, getBytes, getMetadata} = FS;
const {addDoc, collection} = FF;

async function getContent(
    ref: any,
    typeOfContent: "media" | "text",
  ): Promise<[Blob | ArrayBuffer, any]> {
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

export { getContent };