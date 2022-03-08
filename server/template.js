export default function template(body) {
  return `<!DOCTYPE html>
  <html lang="es">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Felix Antonio Cabello Garmendia">
    <meta name="googlebot" content="index">
    <meta name="googlebot" content="follow">
    <meta name="slurp" content="index">
    <meta name="slurp" content="follow">
    <meta name="robots">
    <meta name="user-scalable" content="no">
    <!-- animate.css -->
    <link rel="stylesheet" href="/css/animate.min.css"
      type="text/css" />
    <!-- Preload CSS -->
    <link rel="stylesheet" href="/css/preload.css" type="text/css">
    <meta name="description"
      content="Have a great day watching my portfolio, there are my skills, a brief summary of me and my future vision. I really want to help to everyone need it, contact me in every moment you want, i will response you in no moment">
    <meta name="keywords" content="Portfolio">
    <meta name="keywords" content="CVOnline">
    <meta name="keywords" content="USA">
    <meta name="keywords" content="EEUU">
    <meta name="keywords" content="United States">
    <meta name="keywords" content="Venezuela">
    <meta name="keywords" content="Latam">
    <meta name="keywords" content="Latinoamerica">
    <meta name="keywords" content="Fantoniox">
    <meta name="keywords" content="Future">
    <title>elix Antonio Cabello Portfolio/CVonline</title>
    <!-- Josefin Sans Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap" rel="stylesheet">
    <!-- Normalize -->
    <link rel="stylesheet" href="/css/normalize.css" type="text/css">
    <!-- Boopstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <!-- Common Style -->
    <link rel="stylesheet" href="/css/index.css" type="text/css">
    <!-- Icon link -->
    <link rel="shortcut icon" href="/img/icon.png" type="image/x-icon" />
    <!-- GSAP -->
    <script src="/js/gsap.min.js"></script>
    <!-- GSAP Scroll Trigger -->
    <script src="/js/ScrollToPlugin.min.js"></script>
    <!-- GSAP Scroll To -->
    <script src="/js/ScrollTrigger.min.js"></script>
    <!-- GSAP Register global plugin -->
    <script>
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);
    </script>
    <!-- AnimeJS-->
    <script src="/js/anime.min.js"></script>
  
  </head>
  
    <body allow="fullscreen *">
    
      <div class="body" id="body">
        <!-- Contact page -->
        <!-- Main -->
        <!-- Generated by template -->
        <!-- Home page or welcoming page -->
          ${body}
      </div>
      
      <!-- app -->
      <script src="/js/app.bundle.js" type="application/javascript"></script>
      <!-- Vendor -->
      <script src="/js/vendor.bundle.js" type="application/javascript"></script>
      <!-- Home -->
      <script src="/js/home.js" type="application/javascript"></script>
    </body>
    
    </html>`;
}
