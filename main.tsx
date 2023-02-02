import "https://deno.land/x/dotenv/load.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router } from "https://deno.land/x/rutt@0.0.14/mod.ts";
import { readableStreamFromIterable, readerFromStreamReader, readAll } from "https://deno.land/std@0.175.0/streams/mod.ts";

import "./utils/moduleDeclarations.ts";
import ReactDOMServer from "https://esm.sh/react-dom@18.2.0/server";

import { storage, FS } from "./utils/firebaseInitializer.ts";
const { ref } = FS;

import { getContent, addMessage } from "./utils/firebaseUtils.ts";

// import template from "./templates/template.js";
import templateHome from "./templates/templateHome.js";
import components from "./src/components.tsx";

async function renderSSR(component: JSX.Element, name: string): Promise<Response> {
  try {
    const content = ReactDOMServer.renderToString(component);
    const document = await templateHome(content, name);

    const stream = readableStreamFromIterable(document);

    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      status: 200,
      headers: { "Content-Type": "text/html", "x-content-type-options": "nosniff", },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}

function fileMatcher(url: Request["url"], extension: string): Response | string {
  const regex = new RegExp(`\/(?<fileName>\\w+).${extension}$`);
  const urlMatch = url.match(regex);
  const fileName = urlMatch?.groups?.fileName;
  if (fileName == undefined) return new Response("Bad URL recourse inquiry", { status: 400 });
  return fileName;
}

const handler = router({
  "GET@/static/*": async function (req) {
    const splittedUrl = req.url.split("static/");
    const staticContentToFetch = splittedUrl.at(splittedUrl.length - 1);
    const cacheControl = req.headers.get("Cache-Control");

    try {
      const staticRef = ref(storage, staticContentToFetch);
      const typeOfContent = splittedUrl.some((v) => v.includes("media"))
        ? "media"
        : "text";

      const content = await getContent(staticRef, typeOfContent);

      const resp = new Response(content[0], {
        status: 200,
        headers: {
          "Content-Type": content[1].contentType?? "application/octet-stream",
          "Cache-Control": cacheControl?.includes("no-cache") ? "public, max-age=172800" : "no-cache",
        },
      });

      return resp;
    } catch (error) {
      console.error(error);
      return new Response("Not Found", { status: 404 });
    }
  },
  // This will be converted to useful middleware
  "GET@/dynamic/*": async function (req) {
    const cacheControl = req.headers.get("Cache-Control");

    if (req.url.includes("js")) {
      const fileName = fileMatcher(req.url, "js");
      if (typeof fileName !== "string") return fileName;
      try {
        const file = await Deno.readFile(Deno.cwd() + "/dist/" + fileName + ".js");
        return new Response(file, { headers: {"Content-Type": "application/x-javascript", "Cache-Control": cacheControl?.includes("no-cache") ? "public, max-age=1800" : "no-cache" }});
      } catch (error) {
        console.error(error);
        return new Response("Recourse not found", { status: 404 });
      }
    } else if (req.url.includes("css")) {
      const fileName = fileMatcher(req.url, "css");
      if (typeof fileName !== "string") return fileName;
      try {
        const file = await Deno.readFile(Deno.cwd() + "/dist/" + fileName + ".css");
        return new Response(file, { headers: {"Content-Type": "text/css", "Cache-Control": cacheControl?.includes("no-cache") ? "public, max-age=1800" : "no-cache" }});
      } catch (error) {
        console.error(error);
        return new Response("Recourse not found", { status: 404 });
      }
    }
    return new Response("Please contact the administrator, error in GET@/dynamic route", { status: 500 });
  },
  "GET@/": async (_req) => {
    const { name } = components.MainPage;
    const resp = await renderSSR(<components.MainPage.component />, name);
    return resp;
  },
  "GET@/about": async (_req) => {
    const { name } = components.About;
    const resp = await renderSSR(<components.About.component />, name);
    return resp;
  },
  "GET@/works": async (_req) => {
    const { name } = components.Works;
    const resp = await renderSSR(<components.Works.component />, name);
    return resp;
  },
  "GET@/work/:id": async (req) => {
    const urlSplitted = req.url.split("/");
    const id = urlSplitted[urlSplitted.length - 1];
    const { name } = components.WorkWrapper;
    const resp = await renderSSR(<components.WorkWrapper.component id={id} />, name);
    return resp;
  },
  "GET@/*": async (_req) => {
    const { name } = components.NotFound;
    const resp = await renderSSR(<components.NotFound.component />, name);
    return resp;
  },
  // There is an error that disallows me to use a specific path like "/messages"
  "POST@/*": async (req) => {
    if (req.body) {
      const buffer = await readAll(readerFromStreamReader(req.body.getReader()));
      const message = JSON.parse(((new TextDecoder)).decode(buffer));

      if (!("name" in message) || !("email" in message) || !("message" in message)) {
        return new Response("Bad input from the user", { status: 400 });
      }

      try {
        const messageState = await addMessage(message);
        if (!messageState) {
          return new Response("The message was bad recibed! Please contact the administrator to fix the problem", { status: 406 });
        }
        return new Response("The message was succesfully recibed!", { status: 200 });
      } catch (error) {
        console.error(error);
    }
    }
    return new Response("The message was bad recibed! Please contact the administrator to fix the problem", { status: 406 });
  },
});

console.info("Server Running");
await serve(handler);
