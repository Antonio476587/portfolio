import type { APIRoute } from "astro";

const BUCKET = "portfolio-personal-df7a4.appspot.com";

export const GET: APIRoute = async ({ params }) => {
  const path = params.path;

  if (!path) {
    return new Response("Not found", { status: 404 });
  }

  const encodedPath = path.split("/").map(encodeURIComponent).join("%2F");

  const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/media%2F${encodedPath}?alt=media`;

  return fetch(url);
};
