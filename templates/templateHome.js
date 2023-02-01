import templateCompiler from "../utils/templateCompiler.ts";

export default async function template(body, rootNodeName) {
    return `<!DOCTYPE html>
    <html lang="en" style="background-color: #010101;">
    ${await templateCompiler("dist/astro/head/head/index.html")}
  
  <body allow="fullscreen *">
  
    <div class="body" id="body">
  
      ${await templateCompiler("dist/astro/elements/preload/index.html")}

      <!-- Contact page -->
      <!-- Main -->
      <div id="${rootNodeName}">${body}</div>

      ${await templateCompiler("dist/astro/elements/home/index.html")}

      </div>
      
      <!-- App -->
      <script src="/dynamic/js/${rootNodeName}.js" type="application/javascript"></script>
      ${await templateCompiler("dist/astro/scripts/scripts/index.html")}
      <!-- Home -->
      <script src="/static/js/home.js" type="application/javascript"></script>
    </body>
    
    </html>`;
}
