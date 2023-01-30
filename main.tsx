import "https://deno.land/x/dotenv/load.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router } from "https://deno.land/x/rutt@0.0.14/mod.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.175.0/streams/mod.ts";

import "./utils/moduleDeclarations.ts";
import React from "https://esm.sh/react@18.2.0";
import ReactDOMServer from "https://esm.sh/react-dom@18.2.0/server";

import { storage, FS } from "./utils/firebaseInitializer.ts";
const { ref } = FS;

import { getContent, addMessage } from "./utils/firebaseUtils.ts";

// import template from "./server/template.js";
import templateHome from "./server/templateHome.js";
import components from "./src/components.tsx";

async function renderSSR(component: React.ReactNode): Promise<Response> {
  try {
    let content = ReactDOMServer.renderToString(component);
    const document = templateHome(content);

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
console.log("rerrun");


function render(req: Request) {
  // const context = {};
  // const Element = (props: any) => (
  //     <StaticRouter location={req.url} context={context}>
  //         <Page />
  //     </StaticRouter>
  // );
  // const RStream = ssr(() => <Hello name="Denito" />).body;
  // return renderSSR(<NotFound />);
  // const body = ReactDOMServer.renderToString(element);
  /*   if (req.url.endsWith("/") || req.url.endsWith("/?P=false")) {
      // res.append("Link", "</css/preload.css>; rel=preload; as=style");
      // for (let i = 0; i < 6; i++) {
          // res.append("Link", `</img/Q${i + 1}.webp>; rel=preload; as=image`);
      // }
      return templateHome(body);
      // res.send(templateHome(body));
  } else {
      return template(body);
      // res.send(template(body));
  } */
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

      const resp = new Response(content.at(0), {
        status: 200,
        headers: {
          "Content-Type": content.at(1).contentType,
        },
      });

      return resp;
    } catch (error) {
      return new Response("Not Found", { status: 404 });
    }
  },
  "GET@/": async (_req) => {
    const resp = await renderSSR(<components.MainPage />);
    return resp;
  },
  "GET@/about": async (_req) => {
    const resp = await renderSSR(<components.About />);
    return resp;
  },
  "GET@/works": async (_req) => {
    const resp = await renderSSR(<components.Works />);
    return resp;
  },
  "GET@/work/:id": async (req) => {
    const urlSplitted = req.url.split("/");
    const id = urlSplitted[urlSplitted.length - 1];
    const resp = await renderSSR(<components.WorkWrapper id={id} />);
    return resp;
  },
  "GET@/*": async (_req) => {
    const resp = await renderSSR(<components.NotFound />);
    return resp;
  },
  "POST@/": (_req) => new Response("Hello post!", { status: 200 }),
});

await serve(handler, { addr: ":10800" });
