import "https://deno.land/x/dotenv@v3.2.0/load.ts";

if (Deno.env.get("development")) {
  if (Deno.run) {
    const subP = Deno.run({
      cmd: ["deno", "task", "turbo-build"],
      cwd: Deno.cwd(),
    })
    
    if (!(await subP.status()).success) {
      Deno.exit(1);
    }
  }
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
import ReactDOMServer from "https://esm.sh/react-dom@18.2.0/server";
import { createSSRApp, type DefineComponent } from "https://esm.sh/vue@3.2.47";
import { renderToString as vueRenderToString } from "https://esm.sh/vue@3.2.47/server-renderer";

import { FS, storage } from "./utils/firebaseInitializer.ts";
const { ref } = FS;

import { addMessage, getContent, getDownloadURL } from "./utils/firebaseUtils.ts";
import dynamicServer from "./utils/dynamicServer.ts";

import componentFactory from "./utils/componentFactory.ts";

import memoizer from "https://deno.land/x/memoizy@1.0.0/mod.ts";

import templateHome from "./templates/templateHome.js";

async function templateCreator(
  component: JSX.Element | DefineComponent,
  name: string,
  type: "react" | "vue",
): Promise<string> {
  switch (type) {
    case "react": {
      const content = ReactDOMServer.renderToString(component as React.ReactElement);
      const document = await templateHome(content, name);
      return document;
    }
    case "vue": {
      const vueApp = createSSRApp(component);
      return vueRenderToString(vueApp).then(async (html) => {
        return await templateHome(html, name);
      })
    }
  }
}

const getGlobalHandlerAuxiliar = async (url: Request["url"]): Promise<string> => {
  const { Component, name, type, groups } = componentFactory(url);
  let documentTemplate;

  switch (type) {
    case "react": {
      documentTemplate = await templateCreator(<Component {...groups} /> as JSX.Element, name, type);
      break;
    }
    case "vue": {
      documentTemplate = await templateCreator(Component as DefineComponent, name, type);
      break;
    }
  }

  return documentTemplate;
};

// Memoizer functions
const memoStatic = memoizer(getContent, { maxAge: 86400 });
const memoGetGlobalHandlerAuxiliar = memoizer(getGlobalHandlerAuxiliar, { maxAge: 14400 });

async function getGlobalHandlerServerSide (req: Request): Promise<Response> {
  try {
    const documentTemplate = memoGetGlobalHandlerAuxiliar(req.url);

    const stream = readableStreamFromIterable((await documentTemplate));

    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "x-content-type-options": "nosniff",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      "<!doctype html><p>See you soon...</p>",
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}

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
  "GET@/*": async (req) => {
    return await getGlobalHandlerServerSide(req);
  },
  // There is an error that disallows me to use a specific path like "/messages"
  "POST@/*": async (req) => {
    if (req.body) {
      const buffer = await readAll(
        readerFromStreamReader(req.body.getReader()),
      );
      const message = JSON.parse((new TextDecoder()).decode(buffer));

      if (
        !("name" in message) || !("email" in message) || !("message" in message)
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
