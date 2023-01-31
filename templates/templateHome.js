import templateCompiler from "../utils/templateCompiler.ts";
import gsapScripts from "../templates/head/gsapScriptsHTMLTemplate.js";

export default function template(body, rootNodeName) {
    return `<!DOCTYPE html>
    <html lang="en" style="background-color: #010101;">
    ${templateCompiler("templates/head/head.pug", { headTags: templateCompiler.convertToValidPugInsertion(gsapScripts )})}
  
  <body allow="fullscreen *">
  
    <div class="body" id="body">
  
      ${templateCompiler("templates/elements/preload.pug")}

      <!-- Contact page -->
      <!-- Main -->
      <div id="${rootNodeName}">${body}</div>

      ${templateCompiler("templates/elements/home.pug")}

      </div>
      
      <!-- App -->
      <script src="/dynamic/js/${rootNodeName}.js" type="application/javascript"></script>
      ${templateCompiler("templates/scripts/scripts.pug")}
      <!-- Home -->
      <script src="/static/js/home.js" type="application/javascript"></script>
    </body>
    
    </html>`;
}
