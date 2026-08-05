import type { APIRoute } from "astro";

const BUCKET = "portfolio-personal-df7a4.appspot.com";

export const GET: APIRoute = ({ params }) => {
  const path = params.path;
  if (!path) return new Response("Not found", { status: 404 });
  const encoded = path.split("/").map(encodeURIComponent).join("%2F");
  const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/media%2F${encoded}?alt=media`;
  return Response.redirect(url, 302);
};
