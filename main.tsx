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

function renderSSR(component: JSX.Element, name: string): Response {
  try {
    const content = ReactDOMServer.renderToString(component);
    const document = templateHome(content, name);

    const stream = readableStreamFromIterable(document);

    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      status: 200,
      headers: { "Content-Type": "text/html", "x-content-type-options": "nosniff", },
    });
  } catch (error) {
    return new Response(
      '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
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
        },
      });

      return resp;
    } catch (error) {
      console.error(error);
      return new Response("Not Found", { status: 404 });
    }
  },
  "GET@/": (_req) => {
    const { name } = components.MainPage;
    const resp = renderSSR(<components.MainPage.component />, name);
    return resp;
  },
  "GET@/about": (_req) => {
    const { name } = components.About;
    const resp = renderSSR(<components.About.component />, name);
    return resp;
  },
  "GET@/works": (_req) => {
    const { name } = components.Works;
    const resp = renderSSR(<components.Works.component />, name);
    return resp;
  },
  "GET@/work/:id": (req) => {
    const urlSplitted = req.url.split("/");
    const id = urlSplitted[urlSplitted.length - 1];
    const { name } = components.WorkWrapper;
    const resp = renderSSR(<components.WorkWrapper.component id={id} />, name);
    return resp;
  },
  "GET@/*": (_req) => {
    const resp = renderSSR(<components.NotFound.component />);
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
await serve(handler, { addr: ":10800" });
