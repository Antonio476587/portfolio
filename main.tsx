import "https://deno.land/x/dotenv@v3.2.0/load.ts";

if (Deno.env.get("development")) {
  // if (Deno.run) {
  //   const subP = Deno.run({
  //     cmd: ["deno", "task", "turbo-build"],
  //     cwd: Deno.cwd(),
  //   })
    
  //   if (!(await subP.status()).success) {
  //     Deno.exit(1);
  //   }
  // }
}

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router } from "https://deno.land/x/rutt@0.0.14/mod.ts";
import {
  readableStreamFromIterable,
  readAll,
  readerFromStreamReader,
} from "https://deno.land/std@0.175.0/streams/mod.ts";

import "./utils/moduleDeclarations.ts";

import { FS, storage } from "./utils/firebaseInitializer.ts";
const { ref } = FS;

import { addMessage, getContent, getDownloadURL } from "./utils/firebaseUtils.ts";
import dynamicServer from "./utils/dynamicServer.ts";

import memoizer from "https://deno.land/x/memoizy@1.0.0/mod.ts";

// Memoizer functions
const memoStatic = memoizer(getContent, { maxAge: 86400 });
const memoDenoReadFile = memoizer(Deno.readFile, { maxAge: 124000 });

const handler = router({
  "GET@/static/*": async function (req) {
    const splittedUrl = req.url.split("static/");
    const staticContentToFetch = splittedUrl.at(splittedUrl.length - 1);
    const cacheControl = req.headers.get("Cache-Control");

    try {
      const staticRef = ref(storage, staticContentToFetch);
      // If the resource doesn't exist wiill throw an Error
      await getDownloadURL(staticRef);
      const typeOfContent = splittedUrl.some((v) => v.includes("media"))
        ? "media"
        : "text";

      const content = await memoStatic(staticRef, typeOfContent);

      const resp = new Response(content[0], {
        status: 200,
        headers: {
          "Content-Type": content[1].contentType ?? "application/octet-stream",
          "Cache-Control": cacheControl?.includes("no-cache")
            ? "public, max-age=172800"
            : "no-cache",
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
    if (req.url.includes("js")) {
      return await dynamicServer("js", "application/x-javascript", { req });
    } else if (req.url.includes("css")) {
      return await dynamicServer("css", "text/css", { req });
    }
    return new Response(
      "Please contact the administrator, error in GET@/dynamic route",
      { status: 500 },
    );
  },
  "GET@/robots.txt": function (req) {
    const robotsTxt = `
-User-agent: *
-Disallow: /idontknow
`;
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  },
  "GET@/_astro/*": async function (req) {
    const url = new URL(req.url);
    const file = await Deno.readFile(Deno.cwd() + "/frontend/dist/astro" + url.pathname);

    return new Response(file, { status: 200,
    headers: {
      "Content-Type": "text/javascript",
      "x-content-type-options": "nosniff",
    }});
  },
  "GET@/*": async (req) => {

    const urlPattern = new URLPattern({ pathname: "/:page/:id"});
    const match = urlPattern.exec(req.url);
    let index;

    if (match == null) {
      index = new URL(req.url).pathname == '/' ? await memoDenoReadFile(Deno.cwd() + "/frontend/dist/astro/index.html") : await memoDenoReadFile(Deno.cwd() + "/frontend/dist/astro/Errors/NotFound/index.html");
    }
    else { 
      const { pathname: { groups: { page }}} = match;
      index = await memoDenoReadFile(Deno.cwd() + "/frontend/dist/astro/" + page[0].toUpperCase() + page.slice(1).toLowerCase() + "/index.html");
    }

    return new Response(index, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "x-content-type-options": "nosniff",
      },
    });
  },
  // There is an error that disallows me to use a specific path like "/messages"
  "POST@/*": async (req) => {
    if (req.body) {
      const buffer = await readAll(
        readerFromStreamReader(req.body.getReader()),
      );
      const message = JSON.parse((new TextDecoder()).decode(buffer));

      if (
        !("nameMessage" in message) || !("email" in message) || !("message" in message)
      ) {
        return new Response("Bad input from the user", { status: 400 });
      }

      try {
        const messageState = await addMessage(message);
        if (!messageState) {
          return new Response(
            "The message was bad recibed! Please contact the administrator to fix the problem",
            { status: 406 },
          );
        }
        return new Response("The message was succesfully recibed!", {
          status: 200,
        });
      } catch (error) {
        console.error(error);
      }
    }
    return new Response(
      "The message was bad recibed! Please contact the administrator to fix the problem",
      { status: 406 },
    );
  },
});

console.info("Server Running");
await serve(handler);
