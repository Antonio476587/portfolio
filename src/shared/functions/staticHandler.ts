import "https://deno.land/x/xhr@0.1.2/mod.ts";

import firebase from "../saas/firebase.ts";
import {
  getBlob,
  getBytes,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
} from "firebase/storage";

type FileType = "media" | "blob";

type FileTuple = [Uint8Array | Blob, Headers];

export async function getFile(
  { path, type }: { path: string; type: "media" | "blob" },
): Promise<FileTuple | Error> {
  try {
    const storage = await getStorage();

    const fileRef = ref(storage, path);

    // If the file exists, download it, otherwise throw an error
    await getDownloadURL(fileRef);

    const metadata = await getMetadata(fileRef);

    const data =
      await (type === "media" ? getBlob(fileRef) : getBytes(fileRef)) as
        | Uint8Array
        | Blob;

    const fileTuple = [
      data,
      new Headers({
        "Content-Type": metadata.contentType,
        "Content-Length": metadata.size,
        "Cache-Control": metadata.cacheControl,
        "Last-Modified": metadata.updated,
      }),
    ] as FileTuple;

    return fileTuple;
  } catch (error) {
    console.error(error);
    return new Error("File not found");
  }
}
