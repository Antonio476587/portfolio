import templateCompiler from "../utils/templateCompiler.ts";

export default async function template(body, rootNodeName) {
    return `<!DOCTYPE html>
    <html lang="en" style="background-color: #010101;">
    ${await templateCompiler("templates/head/head.ejs")}
  
  <body allow="fullscreen *">
  
    <div class="body" id="body">
  
      ${await templateCompiler("templates/elements/preload.ejs")}

      <!-- Contact page -->
      <!-- Main -->
      <div id="${rootNodeName}">${body}</div>

      ${await templateCompiler("templates/elements/home.ejs")}

      </div>
      
      <!-- App -->
      <script src="/dynamic/js/${rootNodeName}.js" type="application/javascript"></script>
      ${await templateCompiler("templates/scripts/scripts.ejs")}
      <!-- Home -->
      <script src="/static/js/home.js" type="application/javascript"></script>
    </body>
    
    </html>`;
}
