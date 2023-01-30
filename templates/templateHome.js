import templateCompiler from "../utils/templateCompiler.ts";
import gsapScripts from "../templates/head/gsapScriptsHTMLTemplate.js";

export default function template(body) {
    return `<!DOCTYPE html>
    <html lang="en" style="background-color: #010101;">
    ${templateCompiler("templates/head/head.pug", { headTags: templateCompiler.convertToValidPugInsertion(gsapScripts )})}
  
  <body allow="fullscreen *">
  
    <div class="body" id="body">
  
      ${templateCompiler("templates/elements/preload.pug")}

      <!-- Contact page -->
      <!-- Main -->
      <div id="page">${body}</div>

      ${templateCompiler("templates/elements/home.pug")}

      </div>
    
      ${templateCompiler("templates/scripts/scripts.pug")}
      <!-- Home -->
      <script src="/js/home.js" type="application/javascript"></script>
    </body>
    
    </html>`;
}
