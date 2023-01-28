import "https://esm.sh/v104/@types/react@18.0.26/index";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router } from "https://deno.land/x/rutt@0.0.14/mod.ts";

import "https://esm.sh/v104/@types/react@18.0.26/index";
import React from "https://esm.sh/react@18.2.0";
import ReactDOMServer from "https://esm.sh/react-dom@18.2.0/server";

// import template from "./server/template.js";
// import templateHome from "./server/templateHome.js";
import components from "./src/components.tsx";

async function renderSSR(compnent: React.ReactNode): Promise<Response> {
  let controller = new AbortController();
  let didError = false;
  try {
    let stream = await ReactDOMServer.renderToReadableStream(
      compnent,
      {
        signal: controller.signal,
        onError(error) {
          didError = true;
          console.error(error);
        },
      },
    );

    // This is to wait for all Suspense boundaries to be ready. You can uncomment
    // this line if you want to buffer the entire HTML instead of streaming it.
    // You can use this for crawlers or static generation:

    // await stream.allReady;

    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { "Content-Type": "text/html" },
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
/*
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
  interface HTMLAttributes<T> {
    userselect?: string;
  }
}

declare global {
  type email = `${string}@${string}.${string}`;
  interface EventListenerOptions {
    once: boolean;
  }
  interface EventTarget {
    value: string | number | null | email;
    name: string;
    clientWidth: string | number;
    clientHeight: string | number;
    offsetLeft: string | number;
    classList: DOMTokenList;
    style: CSSProperties;
    toggleAttribute(qualifiedName: string, force?: boolean): boolean;
  }
  interface Element {
    offsetHeight: string | number;
  }
  // eslint-disable-next-line no-var
  var scrollMaxY: number;
}
 */
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
