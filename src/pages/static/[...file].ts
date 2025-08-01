import "https://deno.land/x/xhr@0.1.2/mod.ts";

import { getFile } from "../../shared/functions/staticHandler.ts";

export async function GET({ params, request }) {

  try {

    const path = request.url.match(/static(.*)$/)?.[1] || "";
    const mediaExtensions = ['.mp4', '.mp3', '.avi', '.mov', '.wav', '.ogg', '.webm', '.m4a', '.flac', '.svg',];
    const pictureExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.ico'];
    const hasMediaExtension = mediaExtensions.some(ext => path.toLowerCase().endsWith(ext));
    const hasPictureExtension = pictureExtensions.some(ext => path.toLowerCase().endsWith(ext));
    const fileType = hasMediaExtension || hasPictureExtension ? "media" : "blob";
const file = await getFile({ path, type: fileType });
return new Response(file[0],
      {
        headers: file[1]
      }
    );
  } catch (error) {
  console.error(error);
  return new Response(JSON.stringify({ error: error.message }), { status: 500 });
}}
