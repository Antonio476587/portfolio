#!/usr/bin/env -S deno run --allow-net --allow-read

/**
 * HTTPS Proxy for Development
 * Forwards HTTPS requests to Astro dev server running on HTTP
 */

const HTTPS_PORT = 8443;
const HTTP_TARGET = "http://localhost:8085"; // Astro dev server

const cert = await Deno.readTextFile("./localhost.crt");
const key = await Deno.readTextFile("./localhost.key");

console.log(`🔐 HTTPS Proxy starting...`);
console.log(`📡 Proxying: https://localhost:${HTTPS_PORT} → ${HTTP_TARGET}`);
console.log(`⚠️  Make sure Astro dev server is running on ${HTTP_TARGET}`);

Deno.serve(
  {
    port: HTTPS_PORT,
    cert,
    key,
    onListen: ({ hostname, port }) => {
      console.log(`✅ HTTPS Proxy running on https://${hostname}:${port}`);
      console.log(`🔒 Using self-signed certificates`);
      console.log(`⚠️  Browser will show security warning - click "Advanced" and "Proceed to localhost"`);
      console.log(`\n🚀 Open: https://localhost:${port}`);
    },
  },
  async (req: Request) => {
    try {
      // Create target URL by replacing the host
      const url = new URL(req.url);
      const targetUrl = `${HTTP_TARGET}${url.pathname}${url.search}`;
      
      // Forward the request to Astro dev server
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
      
      // Clone response to modify headers if needed
      const responseHeaders = new Headers(response.headers);
      
      // Add CORS headers for development
      responseHeaders.set("Access-Control-Allow-Origin", "*");
      responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      responseHeaders.set("Access-Control-Allow-Headers", "*");
      
      // Handle CORS preflight
      if (req.method === "OPTIONS") {
        return new Response(null, {
          status: 200,
          headers: responseHeaders,
        });
      }
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
      
    } catch (error) {
      console.error("❌ Proxy error:", error.message);
      
      // Check if Astro dev server is running
      if (error.name === "ConnectionRefused" || error.code === "ECONNREFUSED") {
        return new Response(`
          <html>
            <head><title>Proxy Error</title></head>
            <body style="font-family: Arial, sans-serif; padding: 2rem; background: #f5f5f5;">
              <h1>🚫 Astro Dev Server Not Running</h1>
              <p>The HTTPS proxy couldn't connect to the Astro dev server.</p>
              <p><strong>Please start your Astro dev server first:</strong></p>
              <pre style="background: #333; color: #fff; padding: 1rem; border-radius: 4px;">pnpm dev</pre>
              <p>Then refresh this page.</p>
              <hr>
              <small>Target: ${HTTP_TARGET}</small>
            </body>
          </html>
        `, {
          status: 502,
          headers: { "Content-Type": "text/html" }
        });
      }
      
      return new Response(`Proxy Error: ${error.message}`, { 
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
);