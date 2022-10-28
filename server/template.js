import templateCompiler from "../utils/templateCompiler";

export default function template(body) {
    return `<!DOCTYPE html>
  <html lang="en">
  
    ${templateCompiler("templates/head/head.pug")}
  
    <body allow="fullscreen *">
    
      <div class="body" id="body"><!-- Contact page --><!-- Main --><!-- Generated by template --><!-- Home page or welcoming page -->${body}</div>
      
      ${templateCompiler("templates/scripts/scripts.pug")}

    </body>
    
    </html>`;
}
